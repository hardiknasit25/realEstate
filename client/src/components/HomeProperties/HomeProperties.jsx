import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import SigninContext from "../../contexts/SignIn/SigninContext";
import { useNavigate } from "react-router-dom";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const HomeProperties = () => {

  const { setPdata } = useContext(SigninContext);
  const [saleProperty, setSaleProperty] = useState([])
  const [rentProperty, setRentProperty] = useState([])
  const navigate = useNavigate()

  const handleonclick = async (id) => {
    navigate(`/residency/${id}`)
  }


  // get sale property
  async function getSaleProperty() {

    const responce = await fetch("http://localhost:4000/properties/sale");
    const result = await responce.json();

    if (!responce.ok) {
      console.log(result.error);
    }

    if (responce.ok) {
      setSaleProperty(result);
    }
  }

  // get Rent property
  async function getRentProperty() {

    const responce = await fetch("http://localhost:4000/properties/rent");
    const result = await responce.json();

    if (!responce.ok) {
      console.log(result.error);
    }

    if (responce.ok) {
      setRentProperty(result);
    }
  }

  useEffect(() => {
    getSaleProperty();
    getRentProperty();
  }, [])

  return (
    <div>

      {/* places for sale */}
      <div id="residencies" className="r-wrapper p-10 shadow-lg rounded-xl">
        <div className="paddings innerWidth r-container mb-10">
          <div className="flex justify-between items-center gap-2 p-2 mb-3">
            <div className="flex flex-col items-start gap-2">
              <span className="text-2xl font-extrabold text-[#1e63b5]">Best Choices</span>
              <span className="text-primary font-[700] text-3xl">Resent places for Sale</span>
            </div>
          </div>

          <div className='h-auto p-2 w-full'>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="h-[25rem] p-10"
            >
              {/* transition-transform duration-100 ease-in transform hover:scale-105 */}
              {saleProperty?.map((card) => (
                <SwiperSlide key={card._id} className="h-auto p-2">
                  <div className="shadow-sm w-[17rem] h-auto relative px-1 flex">

                    <div className=" w-full h-full flex justify-start rounded-lg shadow-md gap-3 p-3 items-start hover:shadow-lg" onClick={() => handleonclick(card._id)}>
                      <div className="h-[11rem] w-[17rem] right-0 top-0 absolute rounded-xl overflow-hidden">
                        <img src={card.imageUrls[0]} className="object-cover hover:scale-105 hover:transition-transform hover:ease-in hover:transorm hover:duration-300" alt="home_Imagel" />
                      </div>
                      <div className="flex flex-col justify-start gap-1 items-start py-4 px-3 mt-[10rem] h-[10rem]">
                        <div className='flex justify-center items-center'>
                          <FaIndianRupeeSign />
                          <h1 className='text-xl font-semibold'>{card.price}</h1>
                        </div>
                        <h1 className='text-xl font-medium'>{card.title}</h1>
                        <h1>{card.city},{card.country}</h1>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* places for rent  */}
      <div id="residencies" className="r-wrapper p-10 shadow-lg rounded-xl">
        <div className="paddings innerWidth r-container">
          <div className="flex justify-between items-center gap-2 p-2 mb-3">
            <div className="flex flex-col items-start gap-2">
              <span className="text-2xl font-extrabold text-[#1e63b5]">Best Choices</span>
              <span className="text-primary font-[700] text-3xl">Resent places for Rent</span>
            </div>
          </div>

          <div className='h-auto p-2 w-full'>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="h-[25rem] p-10"
            >
              {/* transition-transform duration-100 ease-in transform hover:scale-105 */}
              {rentProperty?.map((card) => (
                <SwiperSlide key={card._id} className="h-auto p-2">
                  <div className="shadow-sm w-[17rem] h-auto relative px-1 flex">

                    <div className=" w-full h-full flex justify-start rounded-lg shadow-md gap-3 p-3 items-start hover:shadow-lg" onClick={() => handleonclick(card._id)}>
                      <div className="h-[11rem] w-[17rem] right-0 top-0 absolute rounded-xl overflow-hidden">
                        <img src={card.imageUrls[0]} className="object-cover  hover:scale-105 hover:transition-transform hover:ease-in hover:transorm hover:duration-300" alt="home_Imagel" />
                      </div>
                      <div className="flex flex-col justify-start gap-1 items-start py-4 px-3 mt-[10rem] h-[10rem]">
                        <div className='flex justify-center items-center'>
                          <FaIndianRupeeSign />
                          <h1 className='text-xl font-semibold'>{card.price} /month</h1>
                        </div>
                        <h1 className='text-xl font-medium'>{card.title}</h1>
                        <h1>{card.city},{card.country}</h1>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeProperties;

