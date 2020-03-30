'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const GroupHook = use('App/Models/Hooks/GroupHook')

class Group extends Model {
    static boot() {
        super.boot()
        this.addHook('afterCreate', 'GroupHook.AssignAdminAsGroupMember')
    }

    members() {
        return this.belongsToMany('App/Models/User').pivotTable('user_groups')
    }

    admin() {
        return this.belongsTo("App/Models/User", 'admin_id', 'id')
    }
}

module.exports = Group
