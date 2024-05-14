import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

function UserListing({ data,setdata }) {

  const handleOnclick = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/delete/${id}`,{
        method: 'DELETE'
      })

      const data = await response.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }

      setdata((prev) => prev.filter((data) => data._id != id))
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className=' flex gap-10 h-auto p-2 w-full flex-wrap'>

        {/* transition-transform duration-100 ease-in transform hover:scale-105 */}
        {data?.map((card) => (
          <div className="shadow-sm w-[17rem] h-auto relative px-1 flex">

            <div className=" w-full h-auto flex justify-start rounded-lg shadow-md gap-3 p-3 items-start hover:shadow-lg">
              <div className="h-[11rem] w-[17rem] right-0 top-0 absolute rounded-xl overflow-hidden">
                <img src={card.imageUrls[0]} className="object-cover hover:scale-105 hover:transition-transform hover:ease-in hover:transorm hover:duration-300" alt="home_Imagel" />
              </div>
              <div className="flex flex-col justify-start gap-1 items-start py-4 px-3 mt-[10rem] h-[12rem]">
                <div className='flex justify-center items-center'>
                  <FaIndianRupeeSign />
                  <h1 className='text-xl font-semibold'>{card.price}</h1>
                </div>
                <h1 className='text-xl font-medium'>{card.title}</h1>
                <h1>{card.city},{card.country}</h1>

                <div className='mt-5 flex justify-center items-center gap-10 mx-auto'>
                  <button className='text-red-500 font-semibold' onClick={() => handleOnclick(card._id)}>DELETE</button>
                  <Link to={`/update-property/${card._id}`}>
                  <button className='text-green-500 font-semibold'>EDIT</button>
                  </Link>
                </div>
              </div>

             
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default UserListing