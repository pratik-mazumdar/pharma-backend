import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    response.cookie('access_token', token.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return response.ok({
      message: 'Login successful',
      auth: {
        isLogin: true,
        token: token.toJSON().token,
      },
    })
  }

  public async logout({ auth, response }: HttpContext) {
    User.accessTokens.delete(auth.user as User, auth.user!.currentAccessToken.identifier)

    response.clearCookie('access_token')

    return response.ok({
      message: 'Logged out successfully',
      auth: {
        isLogin: false,
      },
    })
  }
}
