import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa";

function Favorite() {

  const [data, setdata] = useState([]);

  async function getData() {

    const responce = await fetch("http://localhost:4000/favorite");
    const result = await responce.json();

    if (!responce.ok) {
      // console.log(result.error);
    }

    if (responce.ok) {
      // console.log("result is ", result);
      setdata(result);
      console.log(result);
    }
  }

  console.log(data);

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='flex justify-center items-center p-10'>
      {data.length === 0 ? <div className='flex justify-center items-center p-10'>
        <h1 className=" font-bold text-2xl">No Favorite Properties Yet</h1>
      </div> :
        <div className='flex flex-col bg-slate-100 w-[70%] rounded-[40px] px-10 h-[40rem]'>
          <div className='flex flex-col overflow-scroll snap-none snap-x-none' >
            <div className='flex justify-center items-center p-10'>
              <h1 className=" font-bold text-2xl">Your Favorite Properties</h1>
            </div>
            {data?.map((ele) => (
              <div className='bg-white p-3 rounded-3xl flex gap-3 shadow-lg mb-5 cursor-pointer justify-center items-center transition-transform duration-300 ease-in transform' key={ele._id}>
                <div className='w-[30%] h-[11rem] rounded-3xl'>
                  <img src={ele.image} alt='background' className='h-full w-full rounded-3xl object-cover' />
                </div>
                <div className='w-[80%] h-[10rem] rounded-3xl p-2 flex flex-col gap-2'>
                  <div className='flex justify-between px-2 '>
                    <h1 className='text-[#09221f] font-medium text-xl'>{ele.title}</h1>
                    <div className='flex justify-center items-center'>
                      <FaIndianRupeeSign />
                      <h1 className='text-[#09221f] font-bold text-xl flex'>{ele.price}</h1>
                    </div>
                  </div>
                  <div className='px-2'>
                    <h1 className='text-gray-500'>{ele.city}</h1>
                  </div>
                  <div className='flex justify-between items-center mt-3'>
                    <div className='flex w-[100%] gap-5 p-2'>
                      <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                        <FaBed className='text-[#1e63b5]' />
                        <h1>{ele.facilities.bedrooms} Bedrooms</h1>
                      </div>
                      <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                        < FaBath className='text-[#1e63b5]' />
                        <h1>{ele.facilities.bathrooms} Bathrooms</h1>
                      </div>
                      <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                        <FaCarAlt className='text-[#1e63b5]' />
                        <h1>{ele.facilities.parking} Parkings</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>}
    </div>
  )
}

export default Favorite