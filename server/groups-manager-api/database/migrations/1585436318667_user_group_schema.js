'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGroupSchema extends Schema {
  up () {
    this.create('user_groups', (table) => {
      table.increments()
      table.integer('user_id').notNullabe().unsigned().references('id').inTable('users')
      table.integer('group_id').notNullabe().unsigned().references('id').inTable('groups')
    })
  }

  down () {
    this.drop('user_groups')
  }
}

module.exports = UserGroupSchema
