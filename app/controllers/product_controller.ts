import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { DateTime } from 'luxon'

export default class InventoriesController {
  async summary({ request: _request, response, auth }: HttpContext) {
    try {
      const now = DateTime.now().toISODate()

      const userId = auth.user?.id

      const [totalProducts, totalLowStock, totalExpired] = await Promise.all([
        Product.query()
          .where('user_id', userId as string)
          .count('* as total'),
        Product.query()
          .where('user_id', userId as string)
          .where('is_low_stock', true)
          .count('* as total'),
        Product.query()
          .where('user_id', userId as string)
          .where('expiry_date', '<', now)
          .count('* as total'),
      ])

      return response.created({
        message: 'Total products',
        products: {
          count: totalProducts[0].$extras.total,
          lowStock: totalLowStock[0].$extras.total,
          expired: totalExpired[0].$extras.total,
        },
      })
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const payload = request.only([
        'name',
        'manufacturingDate',
        'expiryDate',
        'buyingPrice',
        'sellingPrice',
        'initialStock',
        'stock',
        'supplier',
        'drug',
      ])

      if (!payload.initialStock) {
        payload.initialStock = payload.stock
      }

      const product = await Product.create(payload)

      return response.created({
        message: 'Product created successfully',
        product,
      })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  async get({ params, response, auth }: HttpContext) {
    try {
      const product = await Product.findManyBy({ id: params.id, userId: auth.user?.id as string })
      if (!product) {
        return response.notFound({ message: 'Invalid product id' })
      }
      return response.created({ product })
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  async getAll({ request, response, auth }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const products = await Product.query()
        .where('user_id', auth.user?.id as string)
        .paginate(page, limit)
      return response.created({ message: 'List of all products', products })
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.find(params.id)
      if (!product) {
        return response.badRequest({ message: 'Invalid product id' })
      }

      const payload = request.only([
        'name',
        'manufacturingDate',
        'expiryDate',
        'buyingPrice',
        'sellingPrice',
        'stock',
        'supplier',
        'drug',
      ])

      product.merge(payload)
      await product.save()

      return response.created({
        message: 'Product updated successfully',
        data: product,
      })
    } catch (error) {
      return response.badRequest(error)
    }
  }
}
