import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 'c0dfe4df-c3ef-4d47-afad-49405fd3e77e',
        fullName: 'Pratik',
        email: 'pratik@dreammonks.com',
        password: '123456',
      },
    ])
  }
}
