import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { assets } from '../asset/assets';
import { ShopContext } from '../contexts/ShopContexts'

const BankTransfer = () => {

    const {currency, navigate} = useContext(ShopContext)
    const location = useLocation();
    const { orderId, amount } = location.state || {}; // Access passed data

    return (
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img src={assets.pay} alt="" />
            <div className="flex flex-col justify-center items-start gap-6">
                <h3 className="text-lg font-semibold text-gray-800">Bank Transfer Details</h3>
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Amount:</strong> {currency}{amount}</p>
                <p><strong>Bank Name:</strong>MoniePoint </p>
                <p><strong>Account Number:</strong> 9055548483</p>
                <p><strong>Account Name:</strong>Babatunde ANuoluwapo Grace</p>
                <p className="text-sm text-gray-600">
                    Please make the payment to the account above and click "Verify Payment" to proceed. <b className=''>The admin will verify your payment manually.</b>
                </p>
                <button onClick={() => navigate('/order')} className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
                    Verify Payment
                </button>
            </div>
        </div>
    );
};

export default BankTransfer;