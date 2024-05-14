import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-hot-toast';

const UpdateFacilities = ({ prevStep,
  propertyDetails, setPropertyDetails }) => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleOnChange = (e) => {
    if (e.target.id === "bedrooms" || e.target.id === "parkings" || e.target.id === "bathrooms")
      setPropertyDetails({
        ...propertyDetails,
        [e.target.id]: e.target.value
      })
  }

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`http://localhost:4000/update/${params.Id}`, {
        method: "post",
        body: JSON.stringify(propertyDetails),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = res.json();
      setLoading(false);
      
      if (data.success === false) {
        setError(data.message)
      }
      navigate(`/residency/${params.Id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit();
    }} className="flex flex-col justify-center items-center">

      <div className="w-[50%] p-10">

        {/* Bedrooms */}
        <div className="flex flex-col gap-1 w-full p-1">
          <span className=" font-semibold">No of Bedrooms</span>
          <input type="number" id="bedrooms" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.bedrooms}
            onChange={handleOnChange} required />
        </div>

        {/* Parkings */}
        <div className="flex flex-col gap-1 w-full p-1">
          <span className=" font-semibold">No of Parkings</span>
          <input type="number" id="parkings" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.parkings}
            onChange={handleOnChange} required />
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col gap-1 w-full p-1">
          <span className=" font-semibold">No of Bathrooms</span>
          <input type="number" id="bathrooms" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.bathrooms}
            onChange={handleOnChange} required />
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">

          <button className="px-4 bg-white border-[1.5px] border-slate-200 font-semibold text-slate-700 text-sm rounded-md py-2 hover:opacity-95" type="submit" onClick={prevStep}>Back</button>

          <button className="px-4 bg-[#40C057] font-semibold text-white text-sm rounded-md py-2 hover:opacity-95" type="submit">
            {loading ? "Updating.." : "Update Property"}
          </button>

        </div>

        {error && <p className="flex justify-center items-center text-red-400 text-sm">{error}</p>}

      </div>

    </form>
  );
};

export default UpdateFacilities;