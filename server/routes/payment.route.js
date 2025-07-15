import { initiatePayment } from "../controllers/payment.controller.js";
import authUser from "../middleware/auth.middleware.js";
import express from 'express'

const router = express.Router();

router.post('/initiate', authUser, initiatePayment)

export default router;