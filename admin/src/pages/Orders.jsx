import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import serverUrl from '../App'
import toast from 'react-toastify'
const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async() => {
    if(!token){
      return null;
    }

    try {
      const response = await axios.post(serverUrl + '/api/orders/list', {}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>Orders</div>
  )
}

export default Orders