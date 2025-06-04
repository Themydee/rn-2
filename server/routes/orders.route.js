import express from "express";
import { placeOrder, placeOrderTransfer, allOrders, userOrders, updateStatus, verifyPayment } from "../controllers/orders.controller.js";
import adminAuth from "../middleware/admin.auth.js";
import authUser from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/list', adminAuth, allOrders);
router.post('/status', adminAuth, updateStatus)

router.post('/place-order', authUser, placeOrder)
router.post('/place-transfer', authUser, placeOrderTransfer)
router.post('/verify-payment', authUser, verifyPayment)

router.post('/get-orders', authUser, userOrders)

export default router

