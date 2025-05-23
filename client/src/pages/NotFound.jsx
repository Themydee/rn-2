import React from 'react'
import { assets } from '../asset/frontend_assets/assets'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img src={assets.broken_404} alt="" className="w-full md:max-w-[480px]" />
            <div className="flex flex-col justify-center items-start gap-6">
                <p className="font-semibold text-xl text-gray-600">Page Not Found</p>
                <p className="text-gray-500">The page your looking for doesn't exist at the moment! </p>
                <p className="text-gray-500">Contact our call center for further assistance: </p>
                <p className="font-semibold text-xl text-gray-600">Thank you for understanding</p>
                <p className="text-gray-500">You can go back to shopping </p>
                <Link to='/products'><button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Proceed to view products</button></Link>

            </div>
        </div>
    </div>
  )
}

export default NotFound