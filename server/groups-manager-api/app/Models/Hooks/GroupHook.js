const Membership = use("App/Models/UserGroup")

const GroupHook = exports = module.exports = {}

GroupHook.AssignAdminAsGroupMember = async (objectInstance) => {
    await Membership.create({ user_id: objectInstance.admin_id, group_id: objectInstance.id })
}