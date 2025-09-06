import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaTrash, 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaHeart, 
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaStar,
  FaArrowLeft,
  FaGift
} from "react-icons/fa";

const initialCartItems = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: 45,
    originalPrice: 65,
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    category: "Fashion",
    seller: "EcoWear",
    quantity: 1,
    rating: 4.8,
    reviews: 124,
    inStock: 5,
    discount: 31,
    sustainabilityScore: 92
  },
  {
    id: 2,
    name: "Refurbished iPhone 12",
    price: 120,
    originalPrice: 150,
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Electronics",
    seller: "GreenTech",
    quantity: 2,
    rating: 4.6,
    reviews: 89,
    inStock: 12,
    discount: 20,
    sustainabilityScore: 88
  },
  {
    id: 3,
    name: "Bamboo Coffee Mug Set",
    price: 28,
    originalPrice: 35,
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "Home & Garden",
    seller: "EcoLife",
    quantity: 1,
    rating: 4.9,
    reviews: 67,
    inStock: 8,
    discount: 20,
    sustainabilityScore: 95
  }
];

const promoCode = { code: "ECO20", discount: 0.2, description: "20% off eco-friendly items" };

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [savedItems, setSavedItems] = useState([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [showPromoError, setShowPromoError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleQuantityChange = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.inStock, item.quantity + change));
          if (newQuantity === item.inStock && change > 0) {
            addNotification(`Only ${item.inStock} items available`, "warning");
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    const item = cartItems.find(item => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    addNotification(`${item.name} removed from cart`, "info");
  };

  const handleSaveForLater = (id) => {
    const item = cartItems.find(item => item.id === id);
    setSavedItems([...savedItems, item]);
    setCartItems(cartItems.filter((item) => item.id !== id));
    addNotification(`${item.name} saved for later`, "success");
  };

  const handleMoveToCart = (id) => {
    const item = savedItems.find(item => item.id === id);
    setCartItems([...cartItems, item]);
    setSavedItems(savedItems.filter((item) => item.id !== id));
    addNotification(`${item.name} moved to cart`, "success");
  };

  const handlePromoCode = () => {
    if (promoInput.toUpperCase() === promoCode.code) {
      setPromoApplied(true);
      setShowPromoError(false);
      addNotification("Promo code applied successfully!", "success");
    } else {
      setShowPromoError(true);
      setTimeout(() => setShowPromoError(false), 3000);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * promoCode.discount : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => 
      total + (item.originalPrice - item.price) * item.quantity, 0
    );
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    addNotification("Proceeding to secure checkout...", "success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-25 px-4 sm:px-6 lg:px-8">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg shadow-lg ${
                notification.type === "success" ? "bg-green-500" :
                notification.type === "warning" ? "bg-yellow-500" :
                notification.type === "info" ? "bg-blue-500" : "bg-red-500"
              } text-white font-medium`}
            >
              {notification.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
                Your EcoFinds Cart
              </h1>
              <p className="text-gray-600 mt-1">Sustainable choices for a better tomorrow</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-green-500" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaTruck className="text-blue-500" />
              <span>Free Shipping</span>
            </div>
          </div>
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
              Discover amazing eco-friendly products and start your sustainable journey today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Explore Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Cart Items ({calculateTotalItems()})
                  </h2>
                  {calculateSavings() > 0 && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      You're saving ${calculateSavings()}!
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                        <div className="relative">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl"
                          />
                          {item.discount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              -{item.discount}%
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">by {item.seller}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                  {item.category}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <FaStar className="text-yellow-400 text-xs" />
                                  <span className="text-xs text-gray-600">
                                    {item.rating} ({item.reviews})
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-green-600 font-medium">
                                    {item.sustainabilityScore}% Eco
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleSaveForLater(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FaHeart />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center bg-gray-100 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                                  disabled={item.quantity === 1}
                                >
                                  <FaMinus className="text-sm text-gray-600" />
                                </button>
                                <span className="px-4 py-2 font-semibold text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                                  disabled={item.quantity >= item.inStock}
                                >
                                  <FaPlus className="text-sm text-gray-600" />
                                </button>
                              </div>
                              <span className="text-xs text-gray-500">
                                {item.inStock} in stock
                              </span>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                {item.originalPrice > item.price && (
                                  <div className="text-sm text-gray-400 line-through">
                                    ${item.originalPrice * item.quantity}
                                  </div>
                                )}
                                <div className="text-xl font-bold text-gray-800">
                                  ${item.price * item.quantity}
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
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

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Saved for Later ({savedItems.length})
                  </h3>
                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">${item.price}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <span>${calculateSubtotal()}</span>
                  </div>
                  
                  {calculateSavings() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Item discounts</span>
                      <span>-${calculateSavings()}</span>
                    </div>
                  )}
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo discount ({promoCode.discount * 100}%)</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <div className="flex items-center space-x-2">
                      <FaTruck className="text-green-500 text-sm" />
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex justify-center items-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaShieldAlt />
                        <span>Secure Checkout</span>
                      </>
                    )}
                  </motion.button>
                  
                  <button className="w-full text-gray-600 hover:text-gray-800 font-medium transition-colors">
                    Continue Shopping
                  </button>
                </div>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <FaShieldAlt className="text-green-500" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <FaTruck className="text-blue-500" />
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <FaGift className="text-purple-500" />
                    <span>Eco-friendly packaging</span>
                  </div>
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