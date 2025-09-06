import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // profile icon

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setDropdownOpen(false);
  };

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
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded-md w-44 z-50">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setDropdownOpen(false);
                  }}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
