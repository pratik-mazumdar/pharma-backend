/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const InventoriesController = () => import('#controllers/inventories_controller')

router.post('/product', [InventoriesController, 'create'])
router.put('/product/:id', [InventoriesController, 'update'])
router.get('/product/:id', [InventoriesController, 'get'])
router.get('/products', [InventoriesController, 'getAll'])
router.get('/product/count', [InventoriesController, 'count'])

router.get('/', async () => {
  return { hello: 'world' }
})
