import Order from '#models/order'
import Product from '#models/product'
import { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  async count({ request: _request, response }: HttpContext) {
    try {
      const count = await Order.query().count('* as total')
      const total: string = count[0]?.$extras?.total || 0

      return response.created({
        message: 'Total orders',
        products: { count: Number(total) },
      })
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  public async getAll({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const orders = await Order.query().preload('products').paginate(page, limit)
    return response.ok(orders)
  }

  public async create({ request, response }: HttpContext) {
    const data = request.only(['customerName', 'price', 'products'])
    const order = await Order.create(data)

    const orderIds = []
    for (const product of data.products) {
      orderIds.push(product.id)
      Product.query()
        .where('id', product.id)
        .decrement('stock', product.quantity)
        .catch((error) => {
          throw error
        })
    }

    await order.related('products').attach(orderIds)
    return response.created(order)
  }

  public async get({ params, response }: HttpContext) {
    const order = await Order.find(params.id)
    if (!order) return response.notFound({ message: 'Order not found' })

    await order.load('products') // Load related products
    return response.ok(order)
  }
}
