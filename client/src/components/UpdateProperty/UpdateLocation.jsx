import React from "react";
import Map from '../Residency/Map';

const UpdateLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {

  const handleOnChange = (e) => {
    setPropertyDetails({
      ...propertyDetails,
      [e.target.id]: e.target.value
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex justify-between gap-12 mt-12">

        <div className="flex flex-col justify-center items-start p-3" style={{ flex: 1, gap: "1rem" }}>

          {/* Country */}
          <div className="flex flex-col gap-1 w-full p-1">
            <span className=" font-semibold">Country</span>
            <input type="text" id="country" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.country}
              onChange={handleOnChange} required />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1 w-full p-1">
            <span className=" font-semibold">City</span>
            <input type="text" id="city" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.city}
              onChange={handleOnChange} required />
          </div>


          {/* Address */}
          <div className="flex flex-col gap-1 w-full p-1">
            <span className=" font-semibold">Address</span>
            <input type="text" id="address" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.address}
              onChange={handleOnChange} required />
          </div>

        </div>

        {/* right side */}

        <div style={{ flex: 1 }}>
          <Map address={propertyDetails.address} city={propertyDetails.city} country={propertyDetails.country} />
        </div>
      </div>

      <div className="flex justify-center items-center mt-10">
        <button className="px-4 bg-[#228BE6] font-semibold text-white text-sm rounded-md py-2 hover:opacity-95" type="submit" onClick={nextStep}>Next Step</button>
      </div>
    </form>
  );
};

export default UpdateLocation;