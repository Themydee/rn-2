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

export const placeOrderTransfer = async(req, res) => {

}

export const placeOrderCard = async(req, res) => {

}

export const allOrders = async(req, res) => {
    
}

export const userOrders = async(req, res) => {
    try{

    
        const userId = req.user.id;

        await Orders.find({ userId });
        return res.status(201).json({ success: true})

    } catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export const updateStatus = async(req, res) => {

}