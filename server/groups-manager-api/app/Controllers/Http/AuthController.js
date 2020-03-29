'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {

  async login({ request, auth }) {
    const data = request.only(['email', 'password'])
    return await auth.attempt(data.email, data.password)
  }
}

module.exports = AuthController
