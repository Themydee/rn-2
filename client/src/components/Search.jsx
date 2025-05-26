import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContexts'
import { assets } from '../asset/assets'
import { useLocation } from 'react-router-dom'

const Search = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('products') && showSearch) {
            setVisible(true)
        }else{
            setVisible(false)
        }
    },[location])

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(false);
  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center '>
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input value={search} onChange={(e) => setSearch(e.target.value)}type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
            <img className='w-4'src={assets.search_icon} alt="" />
        </div>
        <img className='inline w-3 cursor-pointer ' onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default Search