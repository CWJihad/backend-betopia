import {Router} from 'express'
import {createUser, readUser} from '../controllers/auth.controller.js'

const router = Router()

router.route("/create").post(createUser)
router.route('/user').get(readUser)

export default router