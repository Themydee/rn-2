import axios from 'axios'

export const initiatePayment = async(req, res) => {
    try {
        const {email, amount} = req.body;

        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize', {
                email,
                amount: amount * 100,
                callback_url: `${process.env.CALLBACK_URL}/payment-success`
            },{
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const { authorization_url } = response.data.data;

        return res.status(200).json({ success: true, authorization_url})
    } catch (error) {
        console.error("Paystack init error", error.message)
        return res.status(500).json({
            success: false,
            message: "Payment initiattion failed"
        })
    }
}