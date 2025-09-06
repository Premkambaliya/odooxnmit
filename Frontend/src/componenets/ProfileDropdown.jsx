import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaTachometerAlt,
  FaBox,
  FaHistory,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const dropdownRef = useRef(null);

  // Check localStorage for user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setDropdownOpen(false);
    toast.success("Logged out successfully!");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://odooxnmit.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid email or password");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);

      toast.success("Login successful!");
      setShowLoginModal(false);
      setDropdownOpen(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
      toast.error("Login failed! " + err.message);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://odooxnmit.onrender.com/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          mobile,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message && data.message.toLowerCase().includes("exists")) {
          toast.error("User already exists!");
        } else {
          toast.error(data.message || "Signup failed. Try again.");
        }
        return;
      }

      toast.success("Account created successfully!");
      setShowSignupModal(false);
      setShowLoginModal(true);

      // Reset fields
      setUsername("");
      setMobile("");
      setSignupEmail("");
      setSignupPassword("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Profile Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition"
      >
        <FaUserCircle className="text-2xl text-gray-700" />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border shadow-lg rounded-xl overflow-hidden z-50">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FaTachometerAlt className="text-blue-600" /> Dashboard
              </Link>
              <Link
                to="/my-items"
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FaBox className="text-purple-600" /> My Items
              </Link>
              <Link
                to="/purchase-history"
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FaHistory className="text-green-600" /> Purchase History
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-50 transition"
              >
                <FaSignOutAlt className="text-red-600" /> Logout
              </button>
            </>
          ) : (
            <button
              className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-green-50 transition"
              onClick={() => {
                setShowLoginModal(true);
                setDropdownOpen(false);
              }}
            >
              <FaSignInAlt className="text-green-600" /> Login
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-96 shadow-lg relative">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
              New user?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
              >
                Create an account
              </button>
            </p>

            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-96 shadow-lg relative">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
              >
                Login
              </button>
            </p>

            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowSignupModal(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
