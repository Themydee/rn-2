import { User } from "../models/user.models.js";

export const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body; // Extract itemId and size from the request body
        const userId = req.user.id; // Extract userId from the authenticated user's token

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is initialized

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity
            } else {
                cartData[itemId][size] = 1; // Add new size
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Add new item
        }

        // Use findByIdAndUpdate to update the cartData field
        const updatedUser = await User.findByIdAndUpdate(userId, { cartData }, { new: true });

        return res.json({ success: true, message: "Item added to cart", cartData: updatedUser.cartData });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body; // Extract itemId, size, and quantity from the request body
        const userId = req.user.id; // Extract userId from the authenticated user's token

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (!cartData[itemId] || !cartData[itemId][size]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        cartData[itemId][size] = quantity; // Update quantity

        const updatedUser = await User.findByIdAndUpdate(userId, { cartData }, { new: true });
        return res.json({ success: true, message: "Cart updated successfully", cartData: updatedUser.cartData });
    } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from the authenticated user's token

        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};