import { Orders } from "../models/orders.models.js";
import { User } from "../models/user.models.js";

export const placeOrder = async(req, res) => {
    try {
       const { items, amount, address } = req.body;
        const userId = req.user.id;

        const newOrder = new Orders({
            userId,
            items,
            address,
            amount,
            status: 'Order Placed',
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        });

        await newOrder.save();

        await User.findByIdAndUpdate(userId, {cartData: {}})
        return res.status(201).json({ success: true, message: "Order Placed successfully"})


    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const placeOrderTransfer = async (req, res) => {
    try {
        const { items, amount, address } = req.body; 
        const userId = req.user.id; 

        
        const newOrder = new Orders({
            userId,
            items,
            address,
            amount,
            status: 'Awaiting Payment', 
            paymentMethod: 'Bank Transfer',
            payment: false, 
            date: Date.now(),
        });

        
        await newOrder.save();

        
        await User.findByIdAndUpdate(userId, { cartData: {} });

        
        return res.status(201).json({ success: true, message: "Order placed successfully via bank transfer", order: newOrder });
    } catch (error) {
        console.error("Error placing order via bank transfer:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentProof } = req.body; 
        
        const order = await Orders.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.paymentProof = paymentProof; 
        order.status = "Payment Verification Pending"; 
        await order.save();

        return res.status(200).json({ success: true, message: "Payment proof submitted successfully. Awaiting admin verification.", order });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
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
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const userOrders = async(req, res) => {
    try{

    
        const userId = req.user.id;

        const orders = await Orders.find({ userId });
        return res.status(201).json({ success: true, orders})

    } catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export const updateStatus = async(req, res) => {
    try {
        const { orderId, status } = req.body
        await Orders.findByIdAndUpdate(orderId, { status })
        return res.status(201).json({ success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: true, message:error.message})
    }
}