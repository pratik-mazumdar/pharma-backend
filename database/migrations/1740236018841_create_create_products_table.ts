import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.integer('initial_stock').notNullable()
      table.integer('stock').notNullable()
      table.float('buying_price').notNullable()
      table.float('selling_price').notNullable()
      table.boolean('is_low_stock').defaultTo(false)
      table.string('supplier').notNullable()
      table.string('drug').notNullable()
      table.timestamp('manufacturing_date', { useTz: true })
      table.timestamp('expiry_date', { useTz: true })
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
