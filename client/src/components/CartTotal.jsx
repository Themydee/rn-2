import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContexts';
import Title from './Title';

const CartTotal = () => {
    const { location, setLocation, currency, packaging_fee, getCartAmount, shippingFee } = useContext(ShopContext);

    const subtotal = getCartAmount(); // Subtotal is only the cart items' total
    const total = subtotal + Number(packaging_fee) + Number(shippingFee); // Total includes additional fees

    return (
        <div className='w-full'>
            <div className="text-2xl">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>

            <div className="flex flex-col gap-2 text-sm mt-2">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency} {subtotal}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Packaging fee</p>
                    <p>{currency} {packaging_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value=''>Select your best drop zone</option>
                        <option value='Lagos'>Lagos</option>
                        <option value='Abuja'>Abuja</option>
                        <option value='Igbo States'>Igbo States</option>
                    </select>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>{currency} {shippingFee}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency} {total}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;