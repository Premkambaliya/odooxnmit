import React, { useState } from "react";
import { FaUpload, FaCheckCircle, FaCamera, FaTag, FaListUl, FaLeaf } from "react-icons/fa";

const Sell = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  // Image preview state
  const [imagePreview, setImagePreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.category || !formData.price || !formData.description || !formData.image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    // For now, just log the form data
    console.log("Product Data:", formData);

    alert("Product listed successfully!");
    
    // Reset form
    setFormData({
      title: "",
      category: "",
      price: "",
      description: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-25 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700">
            List Your <span className="text-emerald-500">Sustainable Find</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Turn your unused items into someone else’s treasure while contributing to a circular economy
          </p>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {/* Left Section - Product Form */}
          <div className="col-span-2 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-6">
              <FaLeaf /> Product Details
            </h2>

            {/* Upload Section */}
            <div className="border-2 border-dashed border-green-300 rounded-lg p-6 flex flex-col items-center justify-center text-center mb-6">
              <FaUpload className="text-green-500 text-3xl mb-3" />
              <p className="text-gray-600">Upload Product Image</p>
              <p className="text-xs text-gray-400">JPG, PNG or GIF up to 10MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="productImage"
              />
              <label htmlFor="productImage" className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition">
                Choose Image
              </label>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-4 w-48 h-48 object-cover rounded-md" />
              )}
            </div>

            {/* Product Title */}
            <label className="block text-gray-700 font-medium mb-1">Product Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Vintage Leather Jacket - Size M"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Category & Price */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Category <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Price (USD) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Description */}
            <label className="block text-gray-700 font-medium mt-6 mb-1">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your item’s condition, size, brand, and any relevant details..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              List Item
            </button>
          </div>

          {/* Right Section - Tips & Stats */}
          <div className="space-y-6">
            {/* Selling Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4">Selling Tips</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><FaCamera className="text-green-500 mt-1" /> High-Quality Photos increase sales by 40%</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="text-green-500 mt-1" /> Write a Detailed Description with size, condition & features</li>
                <li className="flex items-start gap-2"><FaTag className="text-green-500 mt-1" /> Competitive Pricing attracts more buyers</li>
                <li className="flex items-start gap-2"><FaListUl className="text-green-500 mt-1" /> Choose the Accurate Category</li>
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-700">Join 10K+ Sellers</h3>
              <p className="text-gray-600 mt-1">Our community has sold over 50,000 items</p>
              <div className="flex justify-around mt-6">
                <div>
                  <p className="text-2xl font-bold text-green-600">$2.5M+</p>
                  <p className="text-gray-500 text-sm">Total Sales</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">4.9★</p>
                  <p className="text-gray-500 text-sm">Avg Rating</p>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-green-700">Environmental Impact</h3>
              <p className="text-gray-600 mt-2 text-sm">Every sale reduces waste & carbon footprint</p>
              <div className="mt-4 space-y-2">
                <p className="text-green-600 font-medium">🌍 CO₂ Saved: <span className="text-gray-800">~2.3kg</span></p>
                <p className="text-green-600 font-medium">♻️ Waste Reduced: <span className="text-gray-800">~1.2kg</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
