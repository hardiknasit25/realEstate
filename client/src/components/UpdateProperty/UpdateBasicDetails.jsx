import React from "react";

const UpdateBasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {

  const handleOnChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setPropertyDetails({
        ...propertyDetails,
        type: e.target.id
      })
    }

    if (e.target.id === 'furnished') {
      setPropertyDetails({
        ...propertyDetails,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "title" || e.target.id === "description" || e.target.id === "price") {
      setPropertyDetails({
        ...propertyDetails,
        [e.target.id]: e.target.value,
      });
    }

  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
    }} className="flex flex-col gap-3 justify-center items-center">

      <div className="w-[50%] p-10 ">
        {/* Title */}
        <div className="flex flex-col gap-1 w-full p-1">
          <span className=" font-semibold">Title</span>
          <input
            type="text"
            id="title"
            className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal"
            value={propertyDetails.title}
            onChange={handleOnChange}
            required />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 w-full p-1">
          <span className=" font-semibold">Description</span>
          <input type="text" id="description" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.description}
            onChange={handleOnChange} required />
        </div>

        {/* Type */}
        <div className="mt-2 flex gap-5">
          <div className="flex gap-3">
            <input type="checkbox" id="sale" className="w-5 h-5" onChange={handleOnChange} checked={propertyDetails.type === "sale"} />
            <span>Sale</span>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" id="rent" className="w-5 h-5" onChange={handleOnChange} checked={propertyDetails.type === "rent"} />
            <span>Rent</span>
          </div>
          <div className="flex gap-3">
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              onChange={handleOnChange}
              checked={propertyDetails.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>

        {/* Price */}
        {propertyDetails.type === "rent" ?
          < div className="flex flex-col gap-1 w-full p-1">
            <span className=" font-semibold">Rent (per/month)</span>
            <input type="number" id="price" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.price}
              onChange={handleOnChange} required />
          </div>
          :
          <div className="flex flex-col gap-1 w-full p-1">
            <span className=" font-semibold">Price</span>
            <input type="number" id="price" className="w-full p-2 border-[1.5px] border-slate-300 rounded-md outline-none font-normal" value={propertyDetails.price}
              onChange={handleOnChange} required />
          </div>
        }

        <div className="flex justify-center items-center gap-4 mt-10">
          <button className="px-4 bg-white border-[1.5px] border-slate-200 font-semibold text-slate-700 text-sm rounded-md py-2 hover:opacity-95" type="submit" onClick={prevStep}>Back</button>

          <button className="px-4 bg-[#228BE6] font-semibold text-white text-sm rounded-md py-2 hover:opacity-95" type="submit" onClick={nextStep}>Next Step</button>
        </div>
      </div>
    </form>
  );
};

export default UpdateBasicDetails;