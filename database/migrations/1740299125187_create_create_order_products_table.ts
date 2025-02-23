import { BaseSchema } from '@adonisjs/lucid/schema'

export default class OrderProducts extends BaseSchema {
  protected tableName = 'order_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('order_id').references('id').inTable('orders').onDelete('CASCADE')
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
