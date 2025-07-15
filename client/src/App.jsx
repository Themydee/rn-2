import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Order from './pages/Order.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Search from './components/Search.jsx'
import NotFound from './pages/NotFound.jsx'
import Verify from './pages/verify.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BankTransfer from './pages/bankTransfer.jsx'
import PaymentSuccess from './pages/Paymentuccess.jsx'

const App = () => {
  return (
   
      <div className='px-4 sm:px-[5vw] md:px-[8vw] lg:px-[10vw]'> 
      <ToastContainer />
        <Navbar />

        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path='/verify' element={<Verify />} />
          <Route path="/place-order" element={<PlaceOrder />} /> 
          <Route path="/order" element={<Order />} />
          <Route path='/bank' element={<BankTransfer />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/not-found' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
  )
}

export default App
