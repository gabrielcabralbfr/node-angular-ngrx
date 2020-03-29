'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {

    members() {
        return this.belongsToMany('App/Models/User').pivotTable('user_groups')
    }
}

module.exports = Group
