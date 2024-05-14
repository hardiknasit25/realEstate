import React from 'react'
import CountUp from "react-countup";

function Number() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#09221f]">Our Incradable Achivements</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Over 500 successful property transactions completed, boasting a 98% client satisfaction rate. Our innovative marketing strategies have earned industry-wide recognition, maximizing property values. At [Your Company Name], we redefine real estate experiences with unparalleled expertise and dedication.</p>
        </div>
        <div className="flex flex-wrap justify-around -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <h2 className='title-font font-medium text-3xl text-[#1e63b5]'><CountUp start={8800} end={9000} duration={4} />
                <span>+</span>
              </h2>
              <h2 className=" text-lg mt-2 leading-relaxed">Premium Products</h2>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <h2 className='title-font font-medium text-3xl text-[#1e63b5]'><CountUp start={980} end={2000} duration={4} />
                <span>+</span>
              </h2>
              <h2 className=" text-lg mt-2 leading-relaxed">Happy Coustemer</h2>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <h2 className='title-font font-medium text-3xl text-[#1e63b5]'><CountUp end={46} duration={4} />
                <span>+</span>
              </h2>
              <h2 className=" text-lg mt-2 leading-relaxed">Awards Winning</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Number