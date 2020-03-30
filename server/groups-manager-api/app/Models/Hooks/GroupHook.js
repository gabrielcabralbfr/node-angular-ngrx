const Membership = use("App/Models/UserGroup")

const GroupHook = exports = module.exports = {}

GroupHook.AssignAdminAsGroupMember = (objecInstance) => {
    await Membership.create({user_id: objecInstance.admin_id, group_id: objecInstance.id})
}