"use client";
import Link from "next/link";
import React from "react";
import {
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-300 dark:border-gray-700">
      <div className="text-center text-gray-800 dark:text-gray-300">
        <Link href="/privacy-policy" className="text-gray-800 font-medium mb-2 hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms-and-conditions" className="ml-3 text-gray-800 font-medium hover:underline">
          Terms & Conditions
        </Link>
        <Link href="/return-refund" className="ml-3 text-gray-800 font-medium hover:underline">
          Return & Refund Policy
        </Link>
        
        <Link href="/about-us" className="ml-3 text-gray-800 font-medium mb-2 hover:underline">
          About Us
        </Link>
        <Link href="/contact-us" className="ml-3 text-gray-800 font-medium mb-2 hover:underline">
          Contact Us
        </Link>

       
        <div className="mt-8 text-sm flex flex-col items-center">
          <p className="flex items-center gap-2">
            Made with <FaHeart className="text-blue-500" /> by <strong>BlueCode Team</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-400">All Right Reserved || &copy; {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
