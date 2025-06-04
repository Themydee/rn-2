import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import axios from 'axios'
import { toast } from 'react-toastify'

import { ShopContext } from '../contexts/ShopContexts'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    address: '',
    phone: '',
  })

  const onChangeEventHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))

            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const cartAmount = Number(getCartAmount()) || 0;
      const shippingFeeNum = Number(shippingFee) || 0;
      const packagingFeeNum = Number(packaging_fee) || 0;

      if (isNaN(cartAmount) || isNaN(shippingFeeNum) || isNaN(packagingFeeNum)) {
        toast.error('Invalid cart amount or fees. Please check your cart and try again.');
        return;
      }

      const totalAmount = cartAmount + shippingFeeNum + packagingFeeNum;

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount,

      }

      switch (method) {
        case 'cod':
          const response = await axios.post(serverUrl + '/api/orders/place-order', orderData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (response.data.success) {
            setCartItems({})
            navigate('/order')
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'transfer':
         const verifyResponse = await axios.post(serverUrl + '/api/orders/place-transfer', orderData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
         })
          if (verifyResponse.data.success) {
            setCartItems({})
            navigate('/bank', {
              state: {
                orderId: verifyResponse.data.order._id,
                amount: totalAmount,
              },
            })
          } else {
            toast.error(verifyResponse.data.message);
          }
          break;

        default:
          toast.error('Invalid payment method selected')
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const { navigate, serverUrl, token, cartItems, setCartItems, getCartAmount, shippingFee, packaging_fee, products } = useContext(ShopContext)

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row gap-4 justify-between pt-5 sm:pt-14 min-h[80vh] border-t'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input onChange={onChangeEventHandler} name='firstName' value={FormData.firstName} type="text" placeholder='First Name' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />
          <input onChange={onChangeEventHandler} name='lastName' value={FormData.lastName} type="text" placeholder='Last Name' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />
        </div>

        <input onChange={onChangeEventHandler} name='email' value={FormData.email} type="text" placeholder='Email Address' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />

        <div className="flex gap-3">
          <input onChange={onChangeEventHandler} name='street' value={FormData.street} type="text" placeholder='Street' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />
          <input onChange={onChangeEventHandler} name='city' value={FormData.city} type="text" placeholder='City' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />
        </div>
        <input onChange={onChangeEventHandler} name='address' value={FormData.address} type="text" placeholder='Address' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />


        <input onChange={onChangeEventHandler} name='phone' value={FormData.phone} type="text" placeholder='Phone Number' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' required />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">

            <div onClick={() => setMethod('transfer')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'transfer' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>PAY BY TRANSFER</p>
            </div>



            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'> CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder