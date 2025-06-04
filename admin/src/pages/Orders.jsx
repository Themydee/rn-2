import React, { useState, useEffect } from 'react'
import { currency, serverUrl } from '../App'
import axios from 'axios'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const statusHandler = async(event, orderId) => {
    try {
      const response = await axios.post(serverUrl + '/api/orders/status', {orderId, status:event.target.value}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(serverUrl + '/api/orders/list', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])


  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {
          orders.map((orders, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {orders.items.map((item, index) => {
                    if (index === orders.items.length - 1) {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                    } else {
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>, </p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium '>{orders.address.firstName + " " + orders.address.lastName}</p>
                <div>
                  <p>{orders.address.street + ","}</p>
                  <p>{orders.address.city + ","}</p>
                </div>
                <p>{orders.address.email}</p>
                <p>{orders.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {orders.items.length}</p>
                <p className='mt-3'>Method: {orders.paymentMethod}</p>
                <p>Paid status: {orders.payment ? 'Done' : 'Pending'}</p>
                <p>Date {new Date(orders.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{orders.amount}</p>
              <select onChange={(event) => statusHandler(event, orders._id)} className='p-2 font-semibold' value={orders.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders