import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://odooxnmit.onrender.com/api/getproducts`);
        const data = await res.json();

        // Find the product with this ID
        const foundProduct = data.find((p) => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading product...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-block mb-4 text-green-600 hover:underline"
      >
        ← Back to Products
      </Link>

      {/* Product Details */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-green-600 font-bold text-lg mt-2">₹{product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            Category: {product.category}
          </p>

          <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
