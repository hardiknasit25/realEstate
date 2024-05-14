import React, { useEffect, useState } from 'react'
// import SigninContext from '../../contexts/SignIn/SigninContext'
import Map from './Map';
import { FaLocationDot } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

function Residency() {

  // const { pdata } = useContext(SigninContext);
  const navigate = useNavigate();
  const params = useParams();
  // const { pdata } = useSelector(state => state.Residency);
  const [listing, setListing] = useState(
    {
      "_id": "661d6516d0277a0a71f631c9",
      "title": "Spiritual Retreat by the Ganges",
      "description": "Find inner peace and spiritual enlightenment in this serene retreat overlooking the sacred waters of the Ganges in Varanasi.",
      "price": 2010000,
      "address": "978 Maple Ave, Assi Ghat",
      "city": "surat",
      "country": "India",
      "imageUrls": [
        "https://firebasestorage.googleapis.com/v0/b/real-estate-b33b5.appspot.com/o/1713202403619pexels-jovydas-dobilas-2462015.jpg?alt=media&token=bdcdb755-5606-487c-9169-f4544235ff42",
        "https://firebasestorage.googleapis.com/v0/b/real-estate-b33b5.appspot.com/o/1713202403621pexels-terry-magallanes-2631746.jpg?alt=media&token=7d48a22b-37ec-46f5-a801-c763b8b067aa",
        "https://firebasestorage.googleapis.com/v0/b/real-estate-b33b5.appspot.com/o/1713202403621pexels-terry-magallanes-2635038.jpg?alt=media&token=49db7f34-d89e-4116-889c-8f45b7a513d8"
      ],
      "bedrooms": 4,
      "bathrooms": 4,
      "parkings": 1,
      "furnished": true,
      "type": "sale",
      "userRef": "661d641ad0277a0a71f630b6",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  // const [value, setValue] = useState < Date | null > (null)
  const [value, setValue] = useState(new Date())

  const handleOnClick = () => {
    navigate("/properties");
  }

  useEffect(() => {

    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/get/${params.Id}`)
        const data = await res.json();
        if (data.success === false) {
          setError(true)
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      }
      catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    fetchListing();
  }, [params.Id])

  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}

      <div className='bg-white py-10 px-10'>
        <lable className='p-3 text-lg font-semibold flex justify-start items-center gap-2 cursor-pointer text-[#1e63b5]' onClick={handleOnClick}><FaArrowLeftLong />BACK</lable>
        <div className='p-5 w-full flex flex-col justify-center items-center gap-3'>
          <div className='flex justify-center items-center shadow-lg w-[100%] gap-10'>

            <div className='h-[40rem] p-2 w-[50%]'>
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="h-full p-10"
              >
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className='h-[590px]'
                      style={{
                        background: `url(${url}) center repeat`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className='w-[50%] flex flex-col gap-3 p-2'>
              <div className='w-[full] flex flex-col justify-between gap-2 '>
                <div className='flex justify-between items-center p-3'>
                  <h1 className='text-3xl font-semibold'>{listing.title}</h1>
                  <div className='flex justify-center items-center'>
                    <FaIndianRupeeSign />
                    <h1 className='text-2xl font-medium'>{listing.price}</h1>
                  </div>
                </div>
                <div className='h-auto w-[80%] text-start p-2 font-medium'>
                  <span>
                    {listing.address}
                  </span>
                </div>
                <div className='flex gap-5 p-2'>
                  <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                    <FaBed className='text-[#1e63b5]' />
                    <h1>{listing.bedrooms} Bedrooms</h1>
                  </div>
                  <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                    < FaBath className='text-[#1e63b5]' />
                    <h1>{listing.bathrooms} Bathrooms</h1>
                  </div>
                  <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                    <FaCarAlt className='text-[#1e63b5]' />
                    <h1>{listing.parking} Parkings</h1>
                  </div>
                  {listing.furnished === true &&
                    <div className='flex gap-2 justify-center items-center rounded-xl py-1 px-3 bg-blue-50'>
                      <MdChair className='text-[#1e63b5]' />
                      <h1>Furnised</h1>
                    </div>
                  }
                </div>

                <div className='flex gap-3 p-2'>
                  <FaLocationDot className='w-6 h-6' />
                  <h1>{listing.city}</h1>
                </div>

                <div className='w-full p-2'>

                  <Modal opened={opened} onClose={close} title="Select your data of visit">
                    <DatePicker allowDeselect value={value} onChange={setValue} />
                    <button onClick={open} className='w-auto bg-[#1e63b5] h-10 font-semibold text-white rounded hover:scale-[1.025] transition-all ease-in duration-[0.3s]'>Book Visit</button>
                  </Modal>

                  <button onClick={open} className='w-full bg-[#1e63b5] h-10 font-semibold text-white rounded hover:scale-[1.025] transition-all ease-in duration-[0.3s]'>Book Your Visit</button>
                </div>
              </div>
              <div className='w-[full] h-[20rem]'>
                <div className='h-full mb-2'>
                  <Map address={listing.address} city={listing.city} country={listing.country} />
                </div>
              </div>
            </div>
          </div>

          <div className='h-auto w-full flex flex-col mt-5 shadow-lg'>
            <div className='p-4 text-3xl font-bold text-[#1e63b5]'>
              <h1>Photos</h1>
            </div>
            <div className='h-auto p-4 shadow-lg'>
              <div className='h-auto flex gap-2 flex-wrap items-start'>
                {listing.imageUrls.map((url) => (
                  <img className='h-[13rem] w-[15rem] rounded-[10px] shadow-md object-cover' src={url} alt='' />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default Residency

