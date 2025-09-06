import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaHeart,
  FaMapMarkerAlt,
  FaLeaf,
  FaStar,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
  FaCamera,
  FaTimes,
  FaTag,
  FaRecycle,
  FaShoppingCart,
  FaUser,
  FaBolt
} from "react-icons/fa";

const initialItems = [
  {
    id: 1,
    title: "Vintage Leather Jacket - Premium Quality",
    price: 45,
    originalPrice: 120,
    category: "Fashion",
    condition: "Excellent",
    location: "New York, NY",
    seller: "EcoWear Vintage",
    sellerRating: 4.8,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"],
    description: "Authentic vintage leather jacket from the 90s. Well-maintained, no visible wear.",
    sustainabilityScore: 92,
    views: 145,
    likes: 23,
    postedDate: "2024-03-15",
    isOwn: false,
    tags: ["vintage", "leather", "90s", "authentic"],
    size: "Medium",
    brand: "Unknown Vintage"
  },
  {
    id: 2,
    title: "iPhone 12 - Refurbished Like New",
    price: 420,
    originalPrice: 699,
    category: "Electronics",
    condition: "Like New",
    location: "San Francisco, CA",
    seller: "TechRevive",
    sellerRating: 4.9,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"],
    description: "Professionally refurbished iPhone 12 with new battery. Includes original charger.",
    sustainabilityScore: 88,
    views: 289,
    likes: 45,
    postedDate: "2024-03-10",
    isOwn: true,
    tags: ["apple", "smartphone", "refurbished", "warranty"],
    storage: "128GB",
    color: "Blue"
  },
  {
    id: 3,
    title: "Handmade Ceramic Dinnerware Set",
    price: 85,
    originalPrice: 180,
    category: "Home & Garden",
    condition: "Very Good",
    location: "Austin, TX",
    seller: "ArtisanFinds",
    sellerRating: 4.7,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
    description: "Beautiful handmade ceramic set for 6 people. Minor signs of use but fully functional.",
    sustainabilityScore: 95,
    views: 67,
    likes: 12,
    postedDate: "2024-03-12",
    isOwn: false,
    tags: ["handmade", "ceramic", "dinnerware", "artisan"],
    pieces: "24 pieces",
    style: "Modern Rustic"
  },
  {
    id: 4,
    title: "Mountain Bike - Trek 3500",
    price: 280,
    originalPrice: 450,
    category: "Sports & Outdoors",
    condition: "Good",
    location: "Denver, CO",
    seller: "You",
    sellerRating: 4.6,
    images: ["https://images.unsplash.com/photo-1558618047-b12c63c9c4dd?w=400&h=400&fit=crop"],
    description: "Well-maintained Trek mountain bike. Perfect for trails and city riding.",
    sustainabilityScore: 90,
    views: 156,
    likes: 28,
    postedDate: "2024-03-08",
    isOwn: true,
    tags: ["trek", "mountain-bike", "cycling", "outdoor"],
    size: "Large",
    year: "2019"
  }
];

const categories = [
  { id: 'all', name: 'All Items', icon: FaRecycle, count: 234 },
  { id: 'fashion', name: 'Fashion', icon: FaTag, count: 89 },
  { id: 'electronics', name: 'Electronics', icon: FaBolt, count: 67 },
  { id: 'home', name: 'Home & Garden', icon: FaLeaf, count: 45 },
  { id: 'sports', name: 'Sports & Outdoors', icon: FaBolt, count: 33 }
];

const conditions = ['Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];

const ItemsPage = () => {
  const [items, setItems] = useState(initialItems);
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showOwnItems, setShowOwnItems] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set([2, 4]));

  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: 'Fashion',
    condition: 'Good',
    location: '',
    description: '',
    tags: '',
    images: []
  });

  useEffect(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase().includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter own items
    if (showOwnItems) {
      filtered = filtered.filter(item => item.isOwn);
    }

    // Sort items
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchQuery, sortBy, showOwnItems]);

  const handleLike = (itemId) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId);
      } else {
        newLiked.add(itemId);
      }
      return newLiked;
    });
  };

  const handleAddItem = () => {
    const item = {
      ...newItem,
      id: Date.now(),
      seller: "You",
      sellerRating: 4.6,
      views: 0,
      likes: 0,
      postedDate: new Date().toISOString().split('T')[0],
      isOwn: true,
      sustainabilityScore: 85 + Math.floor(Math.random() * 15),
      tags: newItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      images: newItem.images.length > 0 ? newItem.images : ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"]
    };

    setItems([item, ...items]);
    setNewItem({
      title: '',
      price: '',
      originalPrice: '',
      category: 'Fashion',
      condition: 'Good',
      location: '',
      description: '',
      tags: '',
      images: []
    });
    setShowAddModal(false);
  };

  const calculateSavings = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-24">
      {/* Header */}
      <div className="top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                EcoFinds Marketplace
              </h1>
              <p className="text-gray-600 mt-1">Discover sustainable second-hand treasures</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 sm:flex-none sm:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <FaPlus />
                  <span>List Item</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={showOwnItems}
                      onChange={(e) => setShowOwnItems(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">My Items Only</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="text-lg" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Listings</span>
                    <span className="font-medium">{items.filter(item => item.isOwn).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Savings</span>
                    <span className="font-medium text-green-600">52%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredItems.length} Items Found
              </h2>
              <div className="text-sm text-gray-600">
                Showing {selectedCategory === 'all' ? 'all categories' : categories.find(c => c.id === selectedCategory)?.name}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Overlay Icons */}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        {item.isOwn && (
                          <div className="bg-blue-500 text-white p-2 rounded-full text-xs">
                            <FaUser />
                          </div>
                        )}
                        <button
                          onClick={() => handleLike(item.id)}
                          className={`p-2 rounded-full transition-colors ${
                            likedItems.has(item.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <FaHeart className="text-sm" />
                        </button>
                      </div>

                      {/* Condition Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {item.condition}
                        </span>
                      </div>

                      {/* Savings Badge */}
                      {item.originalPrice && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {calculateSavings(item.originalPrice, item.price)}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <FaMapMarkerAlt className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-600">{item.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-gray-600">by {item.seller}</span>
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-400 text-xs" />
                          <span className="text-xs text-gray-600">{item.sellerRating}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-2xl font-bold text-gray-800">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaLeaf className="text-green-500 text-sm" />
                          <span className="text-xs text-green-600 font-medium">
                            {item.sustainabilityScore}%
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <FaEye />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaHeart />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock />
                          <span>{formatDate(item.postedDate)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        {item.isOwn ? (
                          <>
                            <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                            <button className="bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors">
                              <FaTrash />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                              <FaShoppingCart />
                              <span>Add to Cart</span>
                            </button>
                            <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                              <FaEye />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
              >
                <FaSearch className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setShowOwnItems(false);
                  }}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">List New Item</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); handleAddItem(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Vintage Leather Jacket - Like New"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="45"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price ($)
                    </label>
                    <input
                      type="number"
                      value={newItem.originalPrice}
                      onChange={(e) => setNewItem({...newItem, originalPrice: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="120"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="Fashion">Fashion</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home & Garden">Home & Garden</option>
                      <option value="Sports & Outdoors">Sports & Outdoors</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition *
                    </label>
                    <select
                      value={newItem.condition}
                      onChange={(e) => setNewItem({...newItem, condition: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City, State"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                    placeholder="Describe the item's condition, features, and any important details..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newItem.tags}
                    onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="vintage, leather, authentic, 90s"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Add relevant tags to help buyers find your item
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <FaCamera className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload photos</p>
                    <p className="text-sm text-gray-500">
                      Upload up to 8 photos. First photo will be the main image.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💚 EcoFinds Sustainability Tip</h4>
                  <p className="text-sm text-green-700">
                    Be honest about the item's condition and include clear photos. This helps reduce returns 
                    and ensures a positive experience for both buyers and the environment!
                  </p>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    List Item
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemsPage;