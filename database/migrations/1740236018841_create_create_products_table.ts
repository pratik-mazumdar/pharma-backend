import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.date('manufacturing_date').notNullable()
      table.date('expiry_date').notNullable()
      table.decimal('buying_price', 10, 2).notNullable()
      table.decimal('selling_price', 10, 2).notNullable()
      table.boolean('is_low_stock').defaultTo(false)
      table.integer('stock').notNullable()
      table.integer('initial_stock').notNullable()
      table.string('supplier').notNullable()
      table.string('drug').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
