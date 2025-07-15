import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER_URL; 
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get("reference");

    if (!reference) return;

    const items = JSON.parse(sessionStorage.getItem("pay_items"));
    const address = JSON.parse(sessionStorage.getItem("pay_address"));
    const amount = sessionStorage.getItem("pay_amount");

    axios.post(`${serverUrl}/api/orders/verify-paystack`, {
      reference,
      items,
      address,
      amount,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      toast.success("Payment verified and order placed!");
      sessionStorage.clear();
      navigate("/order");
    })
    .catch(err => {
      toast.error("Payment verification failed.");
      console.error(err);
    });
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-xl font-bold">Verifying payment, please wait...</h2>
    </div>
  );
};

export default PaymentSuccess;
