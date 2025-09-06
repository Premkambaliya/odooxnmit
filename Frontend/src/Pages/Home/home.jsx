import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";  // ✅ FIXED


const products = [
  {
    id: 1,
    name: "Vintage Jacket",
    price: "45",
    img: "https://source.unsplash.com/400x400/?jacket,clothes",
    category: "Fashion",
    seller: "EcoWear",
    description: "A stylish vintage jacket perfect for sustainable fashion lovers.",
    date: "Sep 5, 2025",
  },
  {
    id: 2,
    name: "Smartphone",
    price: "120",
    img: "https://source.unsplash.com/400x400/?smartphone,gadget",
    category: "Electronics",
    seller: "GreenTech",
    description: "Refurbished smartphone with excellent performance at low cost.",
    date: "Sep 2, 2025",
  },
  {
    id: 3,
    name: "Wooden Chair",
    price: "60",
    img: "https://source.unsplash.com/400x400/?chair,furniture",
    category: "Furniture",
    seller: "EcoHome",
    description: "Durable wooden chair that brings style and comfort to your home.",
    date: "Aug 28, 2025",
  },
  {
    id: 4,
    name: "Sneakers",
    price: "75",
    img: "https://source.unsplash.com/400x400/?sneakers,shoes",
    category: "Footwear",
    seller: "StepGreen",
    description: "Trendy sneakers that are comfortable and eco-friendly.",
    date: "Aug 20, 2025",
  },
  {
    id: 5,
    name: "Laptop",
    price: "350",
    img: "https://source.unsplash.com/400x400/?laptop,tech",
    category: "Electronics",
    seller: "RefurbHub",
    description: "Pre-owned laptop with powerful performance at an affordable price.",
    date: "Aug 10, 2025",
  },
];
const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="relative w-full h-[80vh]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <div
              className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/1600x900/?fashion,clothes')",
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-xl text-center">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Best Fashion Picks
                </h1>
                <p className="mt-4 text-lg">
                  Trendy & sustainable second-hand clothes
                </p>
                <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/1600x900/?electronics,gadgets')",
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-xl text-center">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Top Electronics
                </h1>
                <p className="mt-4 text-lg">
                  Get refurbished gadgets at amazing deals
                </p>
                <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  Explore Deals
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/1600x900/?furniture,home')",
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-xl text-center">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Stylish Furniture
                </h1>
                <p className="mt-4 text-lg">
                  Pre-owned furniture that feels brand new
                </p>
                <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
                  Browse Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Top Products Section */}

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Top Selling Products
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col"
              whileHover={{ scale: 1.05 }}
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

              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>

              {/* Price + Date */}
              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-bold text-lg">
                  ${product.price}
                </span>
                <span className="text-gray-400 text-xs">{product.date}</span>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-green-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 mt-4 hover:bg-green-700 transition">
                <FaShoppingCart /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
