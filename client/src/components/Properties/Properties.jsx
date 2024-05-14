import React, { useContext, useEffect } from 'react'
import back from '../Properties/title.jpg'
import { useNavigate } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import SigninContext from '../../contexts/SignIn/SigninContext';
import Search from './Search';

function Properties() {

  const navigate = useNavigate()
  const { setPdata, data, setdata } = useContext(SigninContext);

  const handleonclick = async (id) => {
    // const response = await fetch(`http://localhost:4000//properties/${id}`);
    // const result = await response.json();
    // setPdata(result);
    navigate(`/residency/${id}`)
  }

  // get all property data
  async function getData() {

    const responce = await fetch("http://localhost:4000/properties");
    const result = await responce.json();

    if (!responce.ok) {
      // console.log(result.error);
    }

    if (responce.ok) {
      // console.log("result is ", result);
      setdata(result);
      // console.log(result);
    }
  }

  useEffect(() => {
    getData();
  }, [getData])

  return (
    <div className='p-10 px-15 w-full h-auto relative'>

      <div className='flex justify-center items-center px-16 z-100'>
        <div className='flex flex-col w-[90%] top-5 absolute h-[20rem] text-white'>
          <img className='w-full h-full rounded-[40px] shadow-lg object-cover' src={back} alt='background' />
          <div className='absolute mt-2 p-10'>
            <h1 className='text-5xl font-extrabold'>Search in</h1>
          </div>
        </div>

        <div className='z-20 mt-40 p-5 rounded-[40px] flex gap-5 w-full'>

          <div className='flex flex-col bg-slate-100 w-[70%] rounded-[40px] py-10 h-[40rem]'>
            <div className='flex flex-col overflow-y-scroll px-5'>
              {data?.map((ele) => (
                <div className='bg-white p-3 rounded-3xl flex gap-1 shadow-lg mb-5 cursor-pointer justify-center items-center transition-transform duration-300 ease-in transform' onClick={(e) => handleonclick(ele._id, e)} key={ele._id}>
                  <div className='w-[40%] h-[11rem] rounded-3xl'>
                    <img src={ele.imageUrls[0]} alt='background' className='h-full w-full rounded-3xl object-cover' />
                  </div>
                  <div className='w-[80%] h-[10rem] rounded-3xl p-2 flex flex-col gap-2'>
                    <div className='flex justify-between px-2 '>
                      <h1 className='text-[#09221f] font-medium text-xl'>{ele.title}</h1>
                      {ele.type === "rent" ?
                        <div className='flex justify-center items-center'>
                          <FaIndianRupeeSign className='text-[#1e63b5]'/>
                          <h1 className='font-medium text-xl flex text-[#1e63b5]'> {ele.price} /month</h1>
                        </div>
                        :
                        <div className='flex justify-center items-center'>
                          <FaIndianRupeeSign className='text-[#1e63b5]'/>
                          <h1 className='font-medium text-xl flex text-[#1e63b5]'> {ele.price}</h1>
                        </div>
                      }
                    </div>
                    <div className='px-2'>
                      <h1 className='text-gray-500 font-medium'>{ele.address}</h1>
                    </div>
                    <div className='flex justify-between items-center mt-3'>
                      <div className='flex w-[100%] gap-2 p-2'>
                        <div className='flex gap-1 justify-center items-center rounded-xl py-1 px-1 bg-blue-50'>
                          <FaBed className='text-[#1e63b5]' />
                          <h1 className='font-normal'>{ele.bedrooms} Bedrooms</h1>
                        </div>
                        <div className='flex gap-1 justify-center items-center rounded-xl py-1 px-1 bg-blue-50'>
                          < FaBath className='text-[#1e63b5]' />
                          <h1 className='font-normal'>{ele.bathrooms} Bathrooms</h1>
                        </div>
                        <div className='flex gap-1 justify-center items-center rounded-xl py-1 px-1 bg-blue-50'>
                          <FaCarAlt className='text-[#1e63b5]' />
                          <h1 className='font-normal'>{ele.parkings} Parkings</h1>
                        </div>
                        {ele.furnished === true &&
                          <div className='flex gap-1 justify-center items-center rounded-xl py-1 px-1 bg-blue-50'>
                            <MdChair className='text-[#1e63b5]' />
                            <h1 className='font-normal'>Furnised</h1>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
          <Search />
        </div>

      </div>
    </div>
  )
}

export default Properties

