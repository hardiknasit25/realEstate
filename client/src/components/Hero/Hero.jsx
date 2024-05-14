import React, { useEffect, useState } from 'react'
import image from '../Hero/hero-image.jpg'
import { motion } from 'framer-motion';
import { useNavigate} from 'react-router-dom'

function Hero() {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <div>
      <div className='p-10'>
        <div className=' w-auto p-[2rem] gap-x-2 flex text-center order-2 justify-around'>
          <div className='flex items-start flex-col justify-center gap-y-[3rem]'>
            <div className='text-[3.8rem] leading-[4rem] flex items-start flex-col mt-2 -translate-y-2 transition-all duration-[3s] ease-in relative z-10'>
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 5,
                  type: "spring"
                }}
                className='flex item-start'>
                <div className=' h-20 w-20 rounded-[999px] absolute right-[26%] -top-9 -z-10 bg-[#eaca6c]'></div>
                <span className=' text-start font-semibold text-[3.8rem] text-gray-400'>Find <span className=' text-[#09221f]'>The Most</span><br /><span className=' text-[#09221f]'>Approprite Property</span><br /><span className='text-[#09221f]'>For You</span><span> Live In</span></span>
              </motion.h1>

            </div>

            <div className='flex flex-col items-start justify-center text-[0.9rem]'>
              <span className='text-start text-gray-600 text-base font-medium'>Find a variety of properties that suit you very easilty
                <br />Forget all difficulties in finding a residence for you
              </span>
            </div>

            <form onSubmit={handleOnSubmit} className='w-full'>
              <div className='w-full flex justify-between items-center gap-x-2 py-[0.5rem] px-[1rem] border-2 border-slate-400 rounded-md shadow-md'>
                <input type='text' placeholder='Search by title/city/country...' className=' w-full mx-2 text-start outline-none px-2 py-2 font-light' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button className='px-3 py-2 rounded-md bg-[#1e63b5] text-sm text-white font-medium hover:scale-110 transition-all ease-in duration-[0.3s]' type='Submit'>Search</button>
              </div>
            </form>
          </div>

          <div className='w-[50%] flex gap-x-2 justify-center items-center overflow-hidden'>
            <motion.div
              initial={{ x: "7rem", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 4,
                type: "spring"
              }}>
              <img src={image} className='h-[35rem] w-[30rem] border-8 border-[#f3f4f5] rounded-t-[15rem]' alt='' />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;