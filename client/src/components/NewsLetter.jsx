import React from 'react'

const NewsLetter = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subsribe now and get 20% off</p>
        <p className="text-gray-400 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dicta possimus atque repudiandae porro sunt?
        </p>
        <form onSubmit={onSubmitHandler}className='w-full sm:w-1/2 my-6 flex gap-3 items-center mx-auto border pl-3'>
            <input type="email" className='w-full sm:flex-1 outline-none ' placeholder='Enter your email' required />
            <button className="bg-black text-white text-xs px-10 py-4" type='submit'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter