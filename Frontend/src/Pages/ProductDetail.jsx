import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://odooxnmit.onrender.com/api/getproducts");
        const data = await res.json();
        setAllProducts(data);

        // Find product by id
        const foundProduct = data.find((p) => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]); // refreshes when id changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Product not found.
      </div>
    );
  }

  // Quantity logic
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const totalPrice = product.price * quantity;

  // Suggested Products (exclude current one)
  const suggested = allProducts.filter((p) => p._id !== id).slice(0, 4);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      {/* Back */}
      <Link
        to="/products"
        className="inline-block mb-6 text-green-600 hover:text-green-700 font-medium transition"
      >
        ← Back to Products
      </Link>

      {/* Product Showcase */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div className="flex justify-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="max-h-[500px] w-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right - Details */}
        <div>
          <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            {product.title}
          </h1>
          <p className="text-green-600 font-extrabold text-3xl mt-3">
            ₹{product.price}
          </p>
          <p className="text-gray-600 mt-6 leading-relaxed text-lg">
            {product.description || "No description available for this product."}
          </p>

          {/* Quantity */}
          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={decreaseQty}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded-l-lg disabled:opacity-50"
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="px-6 text-lg font-semibold">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded-r-lg"
              >
                +
              </button>
            </div>
            <p className="text-xl font-semibold text-gray-800">
              Total: <span className="text-green-600">₹{totalPrice}</span>
            </p>
          </div>

          {/* Add to Cart */}
          <button className="mt-8 w-full bg-green-600 text-white py-4 rounded-xl font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transform hover:scale-[1.02] transition duration-300">
            🛒 Add {quantity} to Cart
          </button>
        </div>
      </div>

      {/* Suggested Products */}
      {suggested.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You may also like
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {suggested.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className="cursor-pointer min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex-shrink-0"
              >
                {/* Image */}
                <div className="h-48 flex items-center justify-center bg-gray-100">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-gray-800 mt-2 truncate">
                    {item.title}
                  </h3>
                  <p className="text-green-600 font-bold mt-1">₹{item.price}</p>
                  <button
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
