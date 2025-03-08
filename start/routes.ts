/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
// const UsersController = () => import('#controllers/users_controller')
const ProductController = () => import('#controllers/product_controller')
const OrdersController = () => import('#controllers/orders_controller')

router
  .group(() => {
    router.post('/', [OrdersController, 'create'])
    router.get('/count', [OrdersController, 'count'])
    router.get('/:id', [OrdersController, 'get'])
    router.get('/', [OrdersController, 'getAll'])
  })
  .prefix('/api/orders')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

router
  .group(() => {
    router.post('/', [ProductController, 'create'])
    router.get('/summary', [ProductController, 'summary'])
    router.put('/:id', [ProductController, 'update'])
    router.get('/:id', [ProductController, 'get'])
    router.get('/', [ProductController, 'getAll'])
  })
  .prefix('/api/products')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

// router
//   .group(() => {
//     router.post('/', [UsersController, 'create']).use(
//       middleware.auth({
//         guards: ['api'],
//       })
//     )

//     router.put('/:id', [UsersController, 'update'])
//     router.get('/:id', [UsersController, 'get'])
//     router.get('/', [UsersController, 'getAll'])
//   })
//   .prefix('/api/users')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(
      middleware.auth({
        guards: ['api'],
      })
    )
  })
  .prefix('/api/auth')

router.get('/', async () => {
  return { hello: 'world' }
})
