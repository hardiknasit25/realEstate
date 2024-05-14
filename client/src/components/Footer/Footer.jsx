import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <div className="flex ml-10 p-1 text-2xl text-center">
            <Link to={'/'} className="font-bold">
              Real<span className="text-[#1e63b5]">Estate</span>
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-500">Our vision is to make all people
            the best place to live for them.</p>
        </div>
        <div className="flex-grow flex flex-wrap justify-end items-start md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Home</Link>
              </li>
              <li>
                <Link to={"/properties"} className="text-gray-600 hover:text-[#1e63b5]">Properties</Link>
              </li>
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Add Properties</Link>
              </li>
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Fourth Link</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SERVICES</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Loan Calculator</Link>
              </li>
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Add Propeties</Link>
              </li>
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Third Link</Link>
              </li>
              <li>
                <Link to={"/"} className="text-gray-600 hover:text-[#1e63b5]">Fourth Link</Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
            <Link to={"/"} href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@knyttneve</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer