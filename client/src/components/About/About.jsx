import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">About Us</h2>
      <p className="text-lg mb-4">
        Welcome to our real estate agency! We are dedicated to helping you find your dream home, whether you're looking to buy, sell, or rent. With years of experience in the industry, our team of professional agents is committed to providing exceptional service and guiding you through every step of the process.
      </p>
      <p className="text-lg mb-4">
        At our agency, we understand that buying or selling a home can be a significant decision, and we're here to make it as smooth and stress-free as possible. We take the time to listen to your needs and preferences, and we work tirelessly to find the perfect property or buyer for you.
      </p>
      <p className="text-lg mb-4">
        Whether you're a first-time homebuyer, an experienced investor, or someone looking to sell their property, we're here to help you achieve your real estate goals. Contact us today to learn more about our services and how we can assist you in your journey.
      </p>

      <div className="border-t-2 border-gray-300 pt-6">
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <p className="text-lg mb-2">Phone: +1 (123) 456-7890</p>
        <Link mailto={"hardiknasit2004@gmail.com"} className="text-lg mb-2">Email: hardiknasit2004@gmail.com</Link>
        <p className="text-lg mb-2">Address: 123 Main Street, City, State, Zip Code</p>
      </div>
    </div>
  );
};

export default About;
