import React from 'react'
import { assets } from '../asset/assets'
const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32'alt="" />
                <p className='w-full md:w-3/2 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sed ducimus nam tempore quo, 
                    dicta exercitationem molestiae doloribus praesentium nostrum!
                </p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">
                    COMPANY
                </p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5 ">GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>(+234)-7065080140</li>
                    <li>nifetemiboy@gmail.com</li>
                    <li></li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center '>Built with <span className='text-gray-500 font-medium'><a href='https://themydee.vercel.app/'>Themydee</a></span>. Copyright @2025. All Rights Reserved</p>
        </div>
    </div>
    
  )
}

export default Footer