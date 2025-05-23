import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../asset/frontend_assets/assets'

import { ShopContext } from '../contexts/ShopContexts'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');

  const {navigate} = useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row gap-4 justify-between pt-5 sm:pt-14 min-h[80vh] border-t'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className="flex gap-3">
          <input type="text" placeholder='First Name' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input type="text" placeholder='Last Name' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>

        <input type="text" placeholder='Email Address' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' />

        <div className="flex gap-3">
          <input type="text" placeholder='Street' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input type="text" placeholder='City' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' />
        </div>

        <input type="text" placeholder='Phone Number' className='border-gray-300 rounded py-1.5 px-3.5 w-full ' />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=> setMethod('paypal')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.pay_pal} className=' w-24 mx-4' alt="" />
            </div>

            <div onClick={()=>setMethod('interswitch')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'interswitch' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.inter_switch} className=' w-24 mx-4' alt="" />

            </div>

             <div onClick={()=>setMethod('flutterwave')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'flutterwave' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.flutter_wave} className=' w-24 mx-4' alt="" />

            </div>

            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'> CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/order')}className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder