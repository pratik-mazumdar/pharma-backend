import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class InventoriesController {
  async count({ request, response }: HttpContext) {
    try {
      const count = await Product.query().count('* as total')
      const total: string = count[0]?.$extras?.total || 0

      return response.created({
        message: 'Total products',
        products: { count: Number(total) },
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

  async get({ params, response }: HttpContext) {
    try {
      const product = await Product.find(params.id)
      if (!product) {
        return response.notFound({ message: 'Invalid product id' })
      }
      return response.created({ product })
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  async getAll({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const products = await Product.query().paginate(page, limit)
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
