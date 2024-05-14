import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
// import SigninContext from '../../contexts/SignIn/SigninContext';
import { useDispatch, useSelector } from 'react-redux'
import { signinSuccess, signinFailure } from '../../app/users/UserSlice'
import Outh from './Outh';

const Signin = () => {

  const clientId = "959293180934-t4rebg9cit67m2i4ckqf31osgn6143n0.apps.googleusercontent.com";

  // const { user, setUser, setActive } = useContext(SigninContext)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // const onSuccess = (res) => {
  //   console.log("Login Success! Current user:", res.profileObj);
  //   const email = res.profileObj.email
  //   setUser({ email, })
  //   console.log("user is", user)
  //   setClicked(true)
  //   console.log(clicked)
  //   setActive(clicked)
  //   navigate("/")
  // }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start);
  });

  const [formdata, setformdata] = useState({})
  // const [clicked, setClicked] = useState(true)
  const {error} = useSelector((state) => state.user)

  const handleonChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/signin",
      {
        method: "post",
        body: JSON.stringify(formdata),
        headers: {
          'Content-Type': "application/json",
        }
      });
    const data = await res.json()
    if (!res.ok) {
      dispatch(signinFailure(data.message))
    }

    if (res.ok) {
      dispatch(signinSuccess(data))
      navigate("/")
    }
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-white'>
      <div className='flex justify-center items-center p-5 w-full bg-transparent'>
        <div className='border-2 border-slate-200 rounded text-white p-5 h-auto w-[60%] flex justify-between items-center gap-x-1'>
          <div className='bg-white text-black w-[50%] h-auto flex justify-center items-center'>
            <img src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg' alt='signin_image' /></div>
          <div className='text-black w-[50%] h-auto flex flex-col justify-center items-center'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
            </div>

            <form className='mt-8 w-[100%] flex flex-col justify-center items-center gap-y-3 px-7 relative' onSubmit={handleSubmit}>
              <div className='w-[100%]'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#1e63b5]">Email address</label>
                <div className="mt-2">
                  <input id="email" onChange={handleonChange} type="email" autoComplete="email" placeholder='Enter your email' required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[#09221f] sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='w-[100%]'>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#1e63b5]">Enter Password</label>
                  <div className="text-sm">
                    <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" onChange={handleonChange} type="password" placeholder='Enter Password' autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#09221f] sm:text-sm sm:leading-6" />
                </div>
              </div>

              <center className='text-red-500 font-bold'>{error}</center>
              <div className='w-full'>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In
                </button>
              </div>
            </form>
            <div className='mt-4 mb-4 flex justify-center items-center gap-4 w-full px-7'>
              <div className='w-[50%] bg-slate-400 h-[2px] rounded'></div>
              <label className='text-slate-400'>or</label>
              <div className='w-[50%] bg-slate-400 h-[2px] rounded'></div>
            </div>

            <Outh/>

            <label className='mb-5'>Dont have an account ? <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign Up</Link></label>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
