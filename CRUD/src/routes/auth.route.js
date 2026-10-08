import {Router} from 'express'
import {createUser, deleteUser, readUser, updateUser} from '../controllers/auth.controller.js'

const router = Router()

router.route("/create").post(createUser)
router.route('/user').get(readUser)
router.route('/:id/update').put(updateUser)
router.route('/:id/delete').delete(deleteUser)

export default router