import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTrash, 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaShieldAlt,
  FaTag,
  FaArrowLeft,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../redux/authSlice";

const promoCode = { code: "ECO20", discount: 0.2 };

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.auth.cart); // ✅ matches your slice

  const [promoApplied, setPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [showPromoError, setShowPromoError] = useState(false);

  const handlePromoCode = () => {
    if (promoInput.toUpperCase() === promoCode.code) {
      setPromoApplied(true);
      setShowPromoError(false);
    } else {
      setShowPromoError(true);
      setTimeout(() => setShowPromoError(false), 3000);
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateDiscount = () =>
    promoApplied ? calculateSubtotal() * promoCode.discount : 0;

  const calculateTotal = () =>
    calculateSubtotal() - calculateDiscount();

  const calculateTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Your Cart
              </h1>
              <p className="text-gray-600 mt-1">All items you’ve added</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <FaShoppingCart className="text-4xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Discover amazing products and add them to your cart!
            </p>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Cart Items ({calculateTotalItems()})
                </h2>

                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-xl"
                        />

                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500">{item.category}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-gray-100 rounded-lg">
                              <button
                                onClick={() => dispatch(removeFromCart(item._id))}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <FaMinus className="text-sm text-gray-600" />
                              </button>
                              <span className="px-4 py-2 font-semibold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => dispatch(addToCart(item))}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <FaPlus className="text-sm text-gray-600" />
                              </button>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="text-xl font-bold text-gray-800">
                                ₹{item.price * item.quantity}
                              </div>
                              <button
                                onClick={() => dispatch(removeFromCart(item._id))}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg"
                    />
                    <button
                      onClick={handlePromoCode}
                      disabled={promoApplied}
                      className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {showPromoError && (
                    <p className="text-red-500 text-sm mt-2">Invalid promo code</p>
                  )}
                  {promoApplied && (
                    <div className="flex items-center space-x-2 mt-2 text-green-600 text-sm">
                      <FaTag />
                      <span>Promo code "{promoCode.code}" applied!</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({calculateTotalItems()} items)</span>
                    <span>₹{calculateSubtotal()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo discount ({promoCode.discount * 100}%)</span>
                      <span>-₹{calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex justify-center items-center space-x-2"
                  >
                    <FaShieldAlt />
                    <span>Checkout</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
