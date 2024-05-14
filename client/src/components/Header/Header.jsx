import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutSuccess, signOutFailure } from '../../app/users/UserSlice';

function Header() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // call Signout api
  const handleOnSignOut = async () => {
    console.log('signOut');
    try {
      const res = await fetch('http://localhost:4000/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      setShowMenu(false)
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center px-[2rem] mt-1 h-auto">
        <div className="flex justify-center items-center ml-10 p-1 text-2xl text-center">
          <Link to={'/'} className="font-bold">
            Real<span className="text-[#1e63b5]">Estate</span>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-5 h-[4rem] p-2 relative">
          <ul className="flex justify-center item-center text-center gap-10 cursor-pointer p-2">
            <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center">
              <li className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                <NavLink >Home</NavLink>
                <NavLink to={"/"} >Home</NavLink>
              </li>
            </div>

            <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center">
              <li className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                <Link>Properties</Link>
                <Link to={"/properties"}>Properties</Link>
              </li>
            </div>

            <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center">
              <li className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                <Link>About Us</Link>
                <Link to={"/aboutus"}>About Us</Link>
              </li>
            </div>
          </ul>
          {currentUser ? (
            <div className="relative" ref={menuRef}>
              <img
                className="w-8 h-8 object-cover rounded-full cursor-pointer"
                src={currentUser.avatar}
                alt="profile_image"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className="absolute flex flex-col gap-3 top-full right-0 bg-white shadow-md rounded-md p-5 w-[10rem] z-20">
                  <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center cursor-pointer">
                    <div className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                      <span>Sign Out</span>
                      <span onClick={handleOnSignOut}>Sign Out</span>
                    </div>
                  </div>

                  <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center cursor-pointer">
                    <li className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                      <Link>Profile</Link>
                      <Link to="/profile" onClick={() => setShowMenu(false)}>Profile</Link>
                    </li>
                  </div>

                  <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center cursor-pointer">
                    <li className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                      <Link>Add Property</Link>
                      <Link to="/addproperty" onClick={() => setShowMenu(false)}>Add Property</Link>
                    </li>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <div className="transition-all duration-3 flex flex-col overflow-hidden h-7 text-center">
              <li className="flex flex-col text-lg hover:-translate-y-7 hover:text-[#1e63b5] hover:transition-all hover:duration-5 hover:ease-in ease-out transition-all duration-5">
                <Link to={'/signin'}>Login</Link>
                <Link to={'/signin'}>Login</Link>
              </li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
