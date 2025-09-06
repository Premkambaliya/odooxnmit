import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // profile icon
import ProfileDropdown from "./ProfileDropdown";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        SecondHandHub
      </Link>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-600">
          Products
        </Link>

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </nav>
  );
}
