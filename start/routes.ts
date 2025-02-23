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
const UsersController = () => import('#controllers/users_controller')
const InventoriesController = () => import('#controllers/inventories_controller')

router
  .group(() => {
    router.post('/', [InventoriesController, 'create'])

    router.put('/:id', [InventoriesController, 'update'])
    router.get('/:id', [InventoriesController, 'get'])
    router.get('/', [InventoriesController, 'getAll'])
    router.get('/count', [InventoriesController, 'count'])
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
