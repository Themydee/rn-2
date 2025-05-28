import { User } from "../models/user.models.js"

export const addToCart = async(req, res) => {
    try {
        const {userId, itemId, size} = req.body

        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await User.findByIdAndUpdate(userId, {cartData})
        return res.json({ success: true, message: "Item added to cart" })
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

export const updateCart = async(req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(userId, {cartData})
        return res.json({ success: true, message: "Item updated in cart" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message})
    }
}

export const getUserCart = async(req, res) => {
    try {
        const {userId} = req.body;

        const userData = await User.findById(UserId)
        let cartData = await userData.cartData;

        return res.json({ success: true, cartData: userData.cartData});


    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message})
    }
}

