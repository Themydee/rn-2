import express from 'express'
import { addToCart, updateCart, getUserCart } from '../controllers/cart.controller.js'
import authUser from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/add', authUser, addToCart)

router.post('/update', authUser, updateCart)

router.post('/get', authUser, getUserCart)

export default router;