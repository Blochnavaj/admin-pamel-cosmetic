 import React from 'react'
import { NavLink } from 'react-router-dom'
import assets from '../assets/admin_assets/assets'
 
 function SlideBar() {
   return (
     <div className='w-[18%] min-h-screen border-r-2'> 
        <div className='flex flex-col gap-3 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-r-0 px-3 py-3 rounded-md' to='/add'>
              <img className='w-5 h-5 ' src={assets.add_icon} alt="" />
              <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-r-0 px-3 py-3 rounded-md' to='/list'>
              <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
              <p className='hidden md:block'> List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-r-0 px-3 py-3 rounded-md' to='/orders'>
              <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
              <p className='hidden md:block'>Order Items</p>
            </NavLink>

         
        </div>
     </div>
   )
 }
 
 export default SlideBar