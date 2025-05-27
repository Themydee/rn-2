import React, { useEffect, useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { ShopContext } from '../contexts/ShopContexts';
import axios from 'axios';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');


  const { navigate, token, setToken, serverUrl } = useContext(ShopContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(serverUrl + '/api/user/signup', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Sign Up Successful');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(serverUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login Successful');

        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  }, [])





  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="prata-regular text-3xl ">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className=' w-[40%] px-3 py-2 border border-gray-800' placeholder='Username' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className=' w-[40%] px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-[40%] px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className="flex justify-between text-sm mt-[8px] w-[40%]">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            :
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login