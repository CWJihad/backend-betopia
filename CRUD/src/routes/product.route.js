import {Router} from 'express'
import {createProduct, deleteProduct, getAllProducts, updateProduct} from '../controllers/product.controller.js'

const router = Router()

router.route("/create").post(createProduct)
router.route('/get').get(getAllProducts)
router.route('/:id/update').put(updateProduct)
router.route('/:id/delete').delete(deleteProduct)

export default router