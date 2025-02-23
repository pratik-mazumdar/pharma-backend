import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class OrderProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: string

  @column()
  declare productId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
