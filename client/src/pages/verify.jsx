import React, { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContexts';


const verify = () => {

    const {navigate} = useContext(ShopContext)
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        
    }
  return (
    <form onSubmit={onSubmitHandler}className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="prata-regular text-3xl ">Verify Your Email</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      <input type="text" className=' w-[40%] px-3 py-2 border border-gray-800' placeholder='Verification Code' required/>

     
      <button onClick={() => navigate('/')} className='bg-black text-white font-light px-8 py-2 mt-4'>Verify</button>
    </form>
  )
}

export default verify