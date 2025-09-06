import React, { useState } from "react";
    import { createRoot } from "react-dom";
    import { motion } from "framer-motion";
    import { 
      FaShoppingCart, 
      FaStar, 
      FaQuoteLeft, 
      FaRecycle, 
      FaLeaf, 
      FaGlobe,
      FaFacebook,
      FaTwitter,
      FaInstagram,
      FaLinkedin,
      FaEnvelope,
      FaPhone,
      FaMapMarkerAlt,
      FaChevronLeft,
      FaChevronRight,
      FaUsers,
      FaBoxOpen,
      FaAward
    } from "react-icons/fa";

    const products = [
      {
        id: 1,
        name: "Vintage Jacket",
        price: "45",
        img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        category: "Fashion",
        seller: "EcoWear",
        description: "A stylish vintage jacket perfect for sustainable fashion lovers.",
        date: "Sep 5, 2025",
      },
      {
        id: 2,
        name: "Smartphone",
        price: "120",
        img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
        category: "Electronics",
        seller: "GreenTech",
        description: "Refurbished smartphone with excellent performance at low cost.",
        date: "Sep 2, 2025",
      },
      {
        id: 3,
        name: "Wooden Chair",
        price: "60",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        category: "Furniture",
        seller: "EcoHome",
        description: "Durable wooden chair that brings style and comfort to your home.",
        date: "Aug 28, 2025",
      },
      {
        id: 4,
        name: "Sneakers",
        price: "75",
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        category: "Footwear",
        seller: "StepGreen",
        description: "Trendy sneakers that are comfortable and eco-friendly.",
        date: "Aug 20, 2025",
      },
      {
        id: 5,
        name: "Laptop",
        price: "350",
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
        category: "Electronics",
        seller: "RefurbHub",
        description: "Pre-owned laptop with powerful performance at an affordable price.",
        date: "Aug 10, 2025",
      },
      {
        id: 6,
        name: "Designer Handbag",
        price: "85",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        category: "Fashion",
        seller: "LuxSecond",
        description: "Authentic designer handbag in excellent condition.",
        date: "Sep 1, 2025",
      },
    ];

    const reviews = [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing quality products! I've bought several items and they're all in perfect condition. Great for sustainable shopping!",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        product: "Vintage Jacket"
      },
      {
        id: 2,
        name: "Mike Chen",
        rating: 5,
        comment: "The electronics section is fantastic. Got a refurbished laptop that works like new at half the price!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        product: "Laptop"
      },
      {
        id: 3,
        name: "Emma Davis",
        rating: 4,
        comment: "Love the concept of sustainable shopping. The furniture I bought was exactly as described and shipping was fast.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        product: "Wooden Chair"
      },
      {
        id: 4,
        name: "Alex Rodriguez",
        rating: 5,
        comment: "Best second-hand marketplace I've used. Quality verification process gives me confidence in every purchase.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        product: "Sneakers"
      },
    ];

    const Home = () => {
      const [currentSlide, setCurrentSlide] = useState(0);
      const [currentReview, setCurrentReview] = useState(0);

      const heroSlides = [
        {
          bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop",
          title: "Discover Sustainable Fashion",
          subtitle: "Shop trendy, eco-friendly second-hand clothes",
          cta: "Shop Fashion"
        },
        {
          bg: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&h=900&fit=crop",
          title: "Eco-Friendly Electronics",
          subtitle: "Find refurbished gadgets at unbeatable prices",
          cta: "Explore Tech"
        },
        {
          bg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop",
          title: "Timeless Furniture",
          subtitle: "Pre-owned pieces that elevate your home",
          cta: "Browse Furniture"
        }
      ];

      const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      };

      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      };

      const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      };

      const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
      };

      return (
        <div className="w-full min-h-screen bg-gray-50">
          {/* Enhanced Hero Section */}
          <section className="relative w-full h-screen overflow-hidden">
            <div className="relative w-full h-full">
              {heroSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div
                    className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center relative"
                    style={{ backgroundImage: `url(${slide.bg})` }}
                  >
                    {/* Gradient Overlay for Better Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
                    
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                      <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        className="mt-4 text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <button
                          className="bg-green-500 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                        >
                          {slide.cta}
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-800 p-4 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-20"
            >
              <FaChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 md:right-12 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-800 p-4 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-20"
            >
              <FaChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </section>

        

          {/* Top Products Section */}
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-center mb-10 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Top Selling Products
            </motion.h2>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />

                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-gray-500 text-sm">by {product.seller}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 flex-grow mb-4">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-green-600 font-bold text-xl">
                      ${product.price}
                    </span>
                    <span className="text-gray-400 text-xs">{product.date}</span>
                  </div>

                  <button className="w-full bg-green-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-colors">
                    <FaShoppingCart /> Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    About EcoMarket
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    EcoMarket is more than just a marketplace – we're a community dedicated to sustainable living. 
                    Our platform connects conscious consumers with quality pre-owned items, reducing waste while 
                    providing incredible value.
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Every purchase helps create a circular economy where products get a second life, 
                    reducing environmental impact and promoting responsible consumption.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <FaRecycle className="text-3xl text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-700">Eco-Friendly</div>
                    </div>
                    <div className="text-center">
                      <FaLeaf className="text-3xl text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-700">Sustainable</div>
                    </div>
                    <div className="text-center">
                      <FaGlobe className="text-3xl text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-gray-700">Global Impact</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                    alt="About EcoMarket"
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold">2M+</div>
                    <div className="text-sm">Items Saved from Waste</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <motion.h2 
                className="text-3xl font-bold text-center mb-12 text-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                What Our Customers Say
              </motion.h2>

              <div className="relative max-w-4xl mx-auto">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentReview * 100}%)` }}
                  >
                    {reviews.map((review, index) => (
                      <div key={review.id} className="w-full flex-shrink-0 px-4">
                        <motion.div 
                          className="bg-white rounded-xl shadow-lg p-8 text-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <FaQuoteLeft className="text-3xl text-green-600 mx-auto mb-6" />
                          
                          <p className="text-gray-700 text-lg mb-6 italic">
                            "{review.comment}"
                          </p>
                          
                          <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-xl ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <div className="font-semibold text-gray-800">{review.name}</div>
                              <div className="text-sm text-gray-500">Purchased: {review.product}</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <button
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>

                <div className="flex justify-center mt-8 space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReview(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentReview ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">EcoMarket</h3>
                  <p className="text-gray-300 mb-4">
                    Your trusted marketplace for sustainable second-hand goods. 
                    Join us in creating a more sustainable future, one purchase at a time.
                  </p>
                  <div className="flex space-x-4">
                    <FaFacebook className="text-xl hover:text-green-400 transition-colors cursor-pointer" />
                    <FaTwitter className="text-xl hover:text-green-400 transition-colors cursor-pointer" />
                    <FaInstagram className="text-xl hover:text-green-400 transition-colors cursor-pointer" />
                    <FaLinkedin className="text-xl hover:text-green-400 transition-colors cursor-pointer" />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Products</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Categories</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Sell Items</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Categories</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Fashion</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Electronics</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Furniture</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Footwear</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home & Garden</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-3 text-green-400" />
                      <span className="text-gray-300">123 Green Street, Eco City, EC 12345</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="mr-3 text-green-400" />
                      <span className="text-gray-300">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="mr-3 text-green-400" />
                      <span className="text-gray-300">info@ecomarket.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                <p className="text-gray-400">
                  © 2025 EcoMarket. All rights reserved. | 
                  <a href="#" className="hover:text-green-400 transition-colors ml-1">Privacy Policy</a> | 
                  <a href="#" className="hover:text-green-400 transition-colors ml-1">Terms of Service</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      );
    };

    export default Home;