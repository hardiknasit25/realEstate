import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../FirebaseConfing';
import { useDispatch} from 'react-redux'
import { signinSuccess } from '../../app/users/UserSlice'
import {useNavigate} from 'react-router-dom'

function Outh() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleOnClick = async() => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app)

      const result = await signInWithPopup(auth,provider)
      
      const res = await fetch("http://localhost:4000/google",{
        method: "post",
        body: JSON.stringify({email: result.user.email, photo: result.user.photoURL}),
        headers: {
          'Content-Type': "application/json",
        }
      })
      const data = await res.json();
      console.log(data);
      dispatch(signinSuccess(data));
      navigate("/")
    } catch (error) {
      console.log("Can't continue with google, ",error);
    }
  }
  return (
    <div className='w-full px-7'>
      <button onClick={handleOnClick} className='flex w-full justify-center items-center gap-2 rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-gray-500 border-2 border-gray-400 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
        <FcGoogle className='w-5 h-5'/>
        <lable>Continue with Google</lable>
      </button>
    </div>
  )
}

export default Outh