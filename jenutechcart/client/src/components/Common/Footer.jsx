import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-amber-300 bg-gradient-to-b from-amber-50 to-amber-100 py-12 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Newsletter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-amber-800 mb-4">Newsletter</h3>
          <p className="text-amber-700 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-amber-600 mb-6">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-2 border-amber-200 rounded-l-md 
              focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
              transition-all bg-white"
              required
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-sm 
              rounded-r-md transition-all shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shopping Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-amber-800 mb-4">Shop</h3>
          <ul className="space-y-3 text-amber-700">
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-amber-800 mb-4">Support</h3>
          <ul className="space-y-3 text-amber-700">
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-amber-600 transition-colors flex items-center"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-amber-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="#"
              className="hover:text-amber-600 text-amber-700 hover:scale-110 transition-all
              bg-amber-100 p-2 rounded-full"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="hover:text-amber-600 text-amber-700 hover:scale-110 transition-all
              bg-amber-100 p-2 rounded-full"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="hover:text-amber-600 text-amber-700 hover:scale-110 transition-all
              bg-amber-100 p-2 rounded-full"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>

          <div className="bg-amber-100 p-4 rounded-lg">
            <p className="text-amber-800 font-bold mb-1">Call Us</p>
            <p className="text-amber-700 flex items-center">
              <FiPhoneCall className="inline-block mr-2 text-amber-600" />
              0123-456-789
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t-2 border-amber-200 pt-6">
        <p className="text-amber-700 text-sm text-center">
          © 2025, CompileTab, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
