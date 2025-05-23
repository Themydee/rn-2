import React, { useContext, useState } from 'react'

import { ShopContext } from '../contexts/ShopContexts';

const Login = () => {
  
  const [currentState, setCurrentState] = useState('Sign Up');
 const {navigate} = useContext(ShopContext)
  const onSubmitHandler = async(e) => {
    e.preventDefault();

    if (currentState === 'Sign Up') {
      navigate('/verify')
      
    }
  }
  return (
    <form onSubmit={onSubmitHandler}className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="prata-regular text-3xl ">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login' ? '' : <input type="text" className=' w-[40%] px-3 py-2 border border-gray-800' placeholder='Username' required/>}
      <input type="email" className=' w-[40%] px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" className='w-[40%] px-3 py-2 border border-gray-800' placeholder='Password' requred/>
      {currentState === 'Login' ? '' : <input type="password" className='w-[40%] px-3 py-2 border border-gray-800' placeholder='Confirm Password' required/>}

      <div className="flex justify-between text-sm mt-[8px] w-[40%]">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState === 'Login' ? 
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
          :
          <p onClick={() => setCurrentState('Login')}className='cursor-pointer'>Login here</p>
        }
      </div>
      
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login