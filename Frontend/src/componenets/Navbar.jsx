import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen, FaShoppingCart } from "react-icons/fa"; 
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";

export default function Navbar() {
  // Get cart from redux
  const cart = useSelector((state) => state.auth.cart);

  // Calculate total quantity of items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
        <Link to="/products" className="flex items-center gap-2">
          <FaBoxOpen /> Products
        </Link>
        <Link to="/cart" className="relative flex items-center gap-2">
          <FaShoppingCart /> Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </nav>
  );
}
