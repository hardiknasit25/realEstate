import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess, signOutFailure } from '../../app/users/UserSlice';
import { useNavigate } from 'react-router-dom';
import UserListing from './UserListing';

function Profile() {
  const { currentUser } = useSelector(state => state.user);
  const [showListing, setShowListing] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSignOut = async () => {
    try {
      const res = await fetch('http://localhost:4000/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  // const getUserData = async () => {
  //   setShowListing(true);
  //   try {
  //     setError(false);
  //     const res = await fetch(`http://localhost:4000/userproperty/${currentUser._id}`)
  //     const data = await res.json();
  //     if(data.success === false){
  //       setError(true);
  //       return;
  //     }

  //   } catch (error) {
  //     setError(true)
  //   }
  // }

  const getUserData = async () => {
    console.log("Current user is", currentUser._id);
    setShowListing(true);
    try {
      setError(false);
      const res = await fetch(`http://localhost:4000/userproperty/${currentUser?._id}`);
      const responseData = await res.json();
      if (responseData.success === false) {
        setError(true);
      } else {
        setData(responseData); // Set the data state with the fetched listings
      }
    } catch (error) {
      setError(true);
    }
  }

  console.log("data is", data);

  return (
    <div className='flex flex-col gap-10 justify-center items-center mt-10 p-3'>
      <div className=' bg-white shadow-lg rounded-lg p-10 w-[40%] flex flex-col gap-5 justify-center items-center'>
        <div>
          <h1 className='font-bold text-3xl'>Profile</h1>
        </div>

        {currentUser && currentUser.avatar &&  // Add null check for currentUser and avatar
          <div className="w-50% p-5">
            <img
              className="w-40 h-40 object-cover rounded-full cursor-pointer"
              src={currentUser.avatar}
              alt="profile_image"
            />
          </div>
        }

        <div className='w-full px-10 py-10 flex flex-col justify-center items-center gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <label className='font-medium px-2'>Email Id:</label>
            <input
              className='w-full p-2 rounded-md ring-black bg-slate-100'
              placeholder={currentUser?.email} // Add null check for currentUser
            />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label className='font-medium px-2'>Password:</label>
            <input
              className='w-full outline-none p-2 rounded-md bg-slate-100'
              placeholder='password'
            />
          </div>

        </div>
        <div className='flex gap-5'>
          <button className=' bg-red-700 text-white font-semibold rounded-md px-4 py-2 hover:opacity-80' onClick={handleOnSignOut}>Sign Out</button>
          <button className="px-4 py-2 bg-[#40C057] font-semibold text-white text-sm rounded-md hover:opacity-95" type="button"
            onClick={getUserData}>
            Show Your Listing
          </button>
        </div>
      </div>

      <p className='text-green-500'>{error ? "Error showing listing" : ''}</p>
      {showListing &&
        <div className='flex flex-col'>
          <h1 className='p-2 font-bold'>Listings</h1>
          <UserListing data={data} setdata={setData} />
        </div>
      }
    </div>
  )
}

export default Profile
