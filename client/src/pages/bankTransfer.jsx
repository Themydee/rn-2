import React from 'react';
import { assets } from '../asset/assets';


const BankTransfer = () => {

    return (
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img src={assets.pay} alt="" />
            <div className="flex flex-col justify-center items-start gap-6">

                <h3 className="text-lg font-semibold text-gray-800">Bank Transfer Details</h3>
                <p><strong>Bank Name:</strong> </p>
                <p><strong>Account Number:</strong> </p>
                <p><strong>Account Name:</strong> </p>
                <p><strong>Routing Number:</strong> </p>
                <p className="text-sm text-gray-600">
                    Please make the payment to the account above and click "Verify Payment" to confirm.
                </p>

                <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Verify Payment</button>

            </div>
        </div>
    );
};

export default BankTransfer;