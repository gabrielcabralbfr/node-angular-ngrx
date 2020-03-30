'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with memberships
 */
const Group = use("App/Models/Group")
const Membership = use("App/Models/UserGroup")

class MembershipController {
  async getGroups({ request, response }) {
    return await Group.query().with('members').fetch()
  }

  async getGroupMembers({ params }) {
    const { groupId } = params
    return await Group.query().where('id', groupId).with('members').fetch()
  }

  async removeGroupMember({ response, auth, params }) {
    const { groupId, memberId } = params
    const group = await Group.findBy('id', groupId)
    const membership = await Membership
      .query()
      .where('group_id', groupId)
      .andWhere('user_id', memberId)
      .fetch()
    const isNotAdmin = group.admin_id !== auth.user.id
    const notDeletingYourself = membership.user_id == auth.user.id
    if (isNotAdmin && notDeletingYourself) return response.status(403).json({ status: 403, message: "Cannot remove member from a group you're not admin" })

    return await Membership
    .query()
    .where('group_id', groupId)
    .andWhere('user_id', memberId)
    .delete()
  }

  async joinGroup({ request, response }) {
    const data = request.only(['user_id', 'group_id'])

    const isAlreadyMember = await Membership.query().where('user_id', data.user_id).andWhere('group_id', data.group_id).first()
    if (isAlreadyMember) return response.status(400).json({ status: 400, message: "The user is already a member from this group" })

    const groupExists = await Group.findBy('id', data.group_id)
    if (!groupExists) return response.status(400).json({ status: 400, message: "Group does not exist" })

    return await Membership.create(data)
  }
}
module.exports = MembershipController