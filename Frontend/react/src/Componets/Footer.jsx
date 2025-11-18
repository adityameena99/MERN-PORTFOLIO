


import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F7F7F7] text-[#101010] py-14 px-6 sm:px-10 md:px-16">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between 
      items-start md:items-center gap-10 md:gap-6">

        <div className="flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-a6 font-bold tracking-tight">
            Aditya Meena
          </h1>
        </div>

       
        <nav className="flex flex-col sm:flex-row text-base font-a5 gap-4 sm:gap-8">
          <Link to="/skills" className="hover:underline">Skills</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/extras" className="hover:underline">Extras</Link>
        </nav>

        
        <div className="flex flex-col font-a5 items-start gap-4">

          <div>
            <span className="font-semibold">Email: </span>
            <a 
              href="mailto:adimeenaq0@gmail.com" 
              className="hover:underline break-all"
            >
              adimeenaq0@gmail.com
            </a>
          </div>

          <div>
            <span className="font-semibold">Phone: </span>
            <a href="tel:+91-8827665873" className="hover:underline">
              +91-8827665973
            </a>
          </div>

         
          <div className="flex space-x-5 pt-2 text-xl">
            <a
              href="https://www.instagram.com/aditya__7725"
              aria-label="Instagram"
              className="hover:text-gray-600"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-meena-5b2929258"
              aria-label="LinkedIn"
              className="hover:text-gray-600"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com/yourprofile"
              aria-label="Twitter"
              className="hover:text-gray-600"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>


      <div className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Aditya Meena. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
