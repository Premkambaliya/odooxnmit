import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // cart icon

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category + Seller */}
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
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm">
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
