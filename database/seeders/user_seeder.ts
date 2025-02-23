import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        fullName: 'Pratik',
        email: 'pratik@dreammonks.com',
        password: '123456',
      },
    ])
  }
}
