import express from "express";
import { placeOrder, placeOrderTransfer, allOrders, userOrders, updateStatus, verifyPaystackPayment } from "../controllers/orders.controller.js";
import adminAuth from "../middleware/admin.auth.js";
import authUser from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/list', adminAuth, allOrders);
router.post('/status', adminAuth, updateStatus)

router.post('/place-order', authUser, placeOrder)
router.post('/verify-paystack', authUser, verifyPaystackPayment)


router.post('/get-orders', authUser, userOrders)

export default router

