import React from 'react'
import Title from '../components/Title'
import { assets } from '../asset/frontend_assets/assets'
import { Link } from 'react-router-dom'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Abuja Location Address</p>
          <p className="text-gray-500">Tel: 07065080140</p>
          <p className="font-semibold text-xl text-gray-600">Careers</p>
          <p className="text-gray-500">Learn more from our job openings</p>
         <Link to='/not-found' ><button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button></Link>

        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default Contact