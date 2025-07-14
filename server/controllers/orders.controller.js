import axios from "axios";
import { Orders } from "../models/orders.models.js";
import { User } from "../models/user.models.js";
import currency from '../../admin/src/App.jsx'

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;

    const newOrder = new Orders({
      userId,
      items,
      address,
      amount,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    return res
      .status(201)
      .json({ success: true, message: "Order Placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentProof } = req.body;

    const order = await Orders.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentProof = paymentProof;
    order.status = "Payment Verification Pending";
    await order.save();

    return res
      .status(200)
      .json({
        success: true,
        message:
          "Payment proof submitted successfully. Awaiting admin verification.",
        order,
      });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const allOrders = async (req, res) => {
  try {
    console.log("Fetching all orders"); // Debugging
    const orders = await Orders.find({});
    console.log("Orders fetched:", orders); // Debugging
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Orders.find({ userId });
    return res.status(201).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Orders.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: error.message });
  }
};

export const verifyPaystackPayment = async (req, res) => {
  try {
    const { items, amount, address, reference } = req.body;
    const userId = req.user.id;

    // 1. Verify payment with Paystack
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    // 2. Confirm verification was successful
    if (!verifyResponse.data.status) {
      return res.status(400).json({ success: false, message: 'Unable to verify payment with Paystack' });
    }

    const paymentData = verifyResponse.data.data;

    if (paymentData.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Payment not successful' });
    }

    // 3. Save order to DB
    const newOrder = new Orders({
      userId,
      items,
      address,
      amount,
      payment: true,
      paymentMethod: 'transfer',
      transactionRef: paymentData.reference,
      transactionId: paymentData.id,
      status: 'Order Placed',
      date: Date.now(),
    });

    await newOrder.save();

    // 4. Clear user cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({
      success: true,
      message: 'Payment successful and order placed',
    });
  } catch (error) {
    console.error('Verify Paystack Error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};