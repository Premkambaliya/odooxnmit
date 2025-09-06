import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/authSlice"; // adjust path if needed
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // cart icon

// ---------------- ProductCard Component ----------------
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setMessage("✅ Product added to cart!");

    // Clear message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description || "No description available."}
        </p>

        {/* Price + Date */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
          <span className="text-xs text-gray-500">
            {product.createdAt
              ? new Date(product.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          {/* View Details */}
          <Link
            to={`/products/${product._id}`}
            className="flex-1 bg-gray-200 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-300 text-sm"
          >
            View Details
          </Link>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>

        {/* Success Message */}
        {message && (
          <p className="text-green-600 text-xs mt-2 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

// ---------------- Products Page ----------------
export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://odooxnmit.onrender.com/api/getproducts");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-10 py-12 bg-gray-50 min-h-screen mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Top Selling Products
      </h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-3 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-3 rounded w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Footwear">Footwear</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No products found.</p>
      )}
    </div>
  );
}
