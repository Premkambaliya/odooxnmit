export default function Home() {
  const products = [
    { id: 1, name: "iPhone 12", price: "₹35,000", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Laptop Dell", price: "₹45,000", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Bike", price: "₹70,000", img: "https://via.placeholder.com/150" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Second-hand Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md rounded-lg">
            <img src={item.img} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}