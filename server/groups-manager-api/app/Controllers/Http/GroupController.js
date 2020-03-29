'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Group = use("App/Models/Group")
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with groups
 */
class GroupController {
  get rules() {
    return {
      name: 'required',
      admin_id: 'required'
    }
  }

  /**
   * Show a list of all groups.
   * GET groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Group.query().with('admin').fetch()
  }

  /**
   * Render a form to be used for creating a new group.
   * GET groups/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new group.
   * POST groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    let data = request.only(['name'])

    //making sure admin id is the id of the current user
    data = { ...data, admin_id: auth.user.id }
    const validation = await validate(data, this.rules)

    if (validation.fails()) return response.status(400).json({ status: 400, message: validation.messages()[0].message })

    await Group.create(data)
    return auth.user
  }

  /**
   * Display a single group.
   * GET groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Update group details.
   * PUT or PATCH groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    if (!Object.keys(params).includes('id'))
      return response.status(400).json({ status: 400, message: "Group id is missing" })

    let group = await Group.findOrFail(params.id)
    if (!group) return response.status(400).json({ status: 400, message: "Group not found" })

    const data = request.only(['name'])

    group.name = data.name
    return await group.save()
  }

  /**
   * Delete a group with id.
   * DELETE groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = GroupController
