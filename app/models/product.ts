import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import Order from './order.js'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = randomUUID()
    product.isLowStock = false
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @manyToMany(() => Order, { pivotTable: 'order_products' })
  declare products: ManyToMany<typeof Order>

  @column.dateTime({
    serialize: (value: string) => {
      return DateTime.fromISO(value).toFormat('yyyy-MM')
    },
  })
  declare manufacturingDate: DateTime

  @column.dateTime({
    serialize: (value: string) => {
      return DateTime.fromISO(value).toFormat('yyyy-MM')
    },
  })
  declare expiryDate: DateTime

  @column()
  declare initialStock: number

  @column()
  declare buyingPrice: number

  @column()
  declare sellingPrice: number

  @column()
  declare isLowStock: boolean

  @column()
  declare stock: number

  @column()
  declare supplier: string

  @column()
  declare drug: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
