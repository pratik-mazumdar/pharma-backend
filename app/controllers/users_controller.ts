import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  // Get all users
  public async getAll({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  // Create a new user
  public async create({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'isPaid'])

    const user = await User.create(data)
    return response.created(user)
  }

  // Get a single user
  public async get({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }
    return response.ok(user)
  }

  // Update user
  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    user.merge(request.only(['fullName', 'email', 'isPaid']))
    await user.save()
    return response.ok(user)
  }

  // Delete user
  public async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    await user.delete()
    return response.noContent()
  }
}
