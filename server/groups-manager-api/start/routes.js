'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Auth
Route.group(() => {
  Route.post('login', 'AuthController.login')
}).prefix('auth')


// Users
Route.group(() => {
  Route.get('', 'UserController.index')
  Route.post('signup', 'UserController.store')
}).prefix('users')

// Groups
Route.resource('groups', 'GroupController').apiOnly().middleware('auth')

// Memberships
Route.group(() => {
  Route.get(':groupId/members', 'MembershipController.getGroupMembers')
  Route.post('joinGroup', 'MembershipController.joinGroup')
  Route.get(':groupId/members/:memberId/remove', 'MembershipController.removeGroupMember')
}).prefix('membership').middleware('auth')