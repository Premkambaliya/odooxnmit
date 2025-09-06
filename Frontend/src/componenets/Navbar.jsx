import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen, FaShoppingCart } from "react-icons/fa"; 
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center w-full fixed top-0 left-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        SecondHandHub
      </Link>

      {/* Links */}
      <div className="flex gap-8 items-center text-lg ">
        <Link to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </Link>
        <Link to="/products" className="flex items-center gap-2 ">
          <FaBoxOpen /> Products
        </Link>
        <Link to="/cart" className="flex items-center gap-2 ">
          <FaShoppingCart /> Cart
        </Link>

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </nav>
  );
}
