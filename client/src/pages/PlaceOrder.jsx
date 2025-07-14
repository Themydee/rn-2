import React, { useContext, useState } from "react";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../contexts/ShopContexts";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    address: "",
    phone: "",
  });

  const {
    navigate,
    serverUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    shippingFee,
    packaging_fee,
    products,
  } = useContext(ShopContext);

  const cartAmount = Number(getCartAmount()) || 0;
  const shippingFeeNum = Number(shippingFee) || 0;
  const packagingFeeNum = Number(packaging_fee) || 0;
  const totalAmount = cartAmount + shippingFeeNum + packagingFeeNum;

  const onChangeEventHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const generateOrderItems = () => {
    const items = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          const product = products.find((p) => p._id === productId);
          if (product) {
            items.push({
              ...product,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
    }
    return items;
  };

  const handleCOD = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/orders/place-order`,
        {
          address: formData,
          items: generateOrderItems(),
          amount: totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/order");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  const handlePaystackSuccess = async (reference) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/orders/verify-paystack`,
        {
          items: generateOrderItems(),
          amount: totalAmount,
          address: formData,
          reference: reference.reference,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        toast.success("Order placed successfully");
        setCartItems({});
        navigate("/order");
      } else {
        toast.error("Payment verified, but order failed");
      }
    } catch (error) {
      toast.error("Error verifying payment");
    }
  };

  const paystackProps = {
    email: formData.email,
    amount: totalAmount * 100,
    metadata: {
      full_name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
    },
    publicKey: "pk_live_6f7f524ad8aaa6b6316042d11895c55132de7f05", // Replace with your test key for testing
    text: "Pay Now",
    onSuccess: handlePaystackSuccess,
    onClose: () => toast.info("Payment cancelled"),
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (method === "cod") {
      handleCOD();
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="your-form-styles">
      {/* Delivery Info Fields Here */}
      {/* ... your input fields ... */}

      <div className="mt-12">
        <Title text1={"PAYMENT"} text2={"METHOD"} />
        <div className="flex gap-3 flex-col lg:flex-row">
          <div onClick={() => setMethod("transfer")} className="option-card">
            <p className={`dot ${method === "transfer" ? "active" : ""}`}></p>
            <p>PAY BY TRANSFER</p>
          </div>
          <div onClick={() => setMethod("cod")} className="option-card">
            <p className={`dot ${method === "cod" ? "active" : ""}`}></p>
            <p>CASH ON DELIVERY</p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          {method === "transfer" ? (
            <PaystackButton {...paystackProps} className="pay-btn" />
          ) : (
            <button type="submit" className="cod-btn">
              PLACE ORDER
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
