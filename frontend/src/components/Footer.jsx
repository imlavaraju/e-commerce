import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-40 tex-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
          At Our Store, we believe in making fashion accessible to everyone. Our collection is handpicked to reflect the latest trends while ensuring superior craftsmanship.{" "}
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/collection">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy policy</Link> {/* Add this route if needed */}
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 98765 43210</li>
            <li>
              <a href="mailto:nanilavaraju@gmail.com" target="_blank" rel="noopener noreferrer">
                Store Owner Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">©Copyright 2024 @respective Owner - All Right Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
