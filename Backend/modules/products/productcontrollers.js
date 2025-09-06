const { getDB } = require("../../config/db");

// Static products without ObjectId
const staticProducts = [
  {
    title: "Wooden Study Table",
    description: "A gently used wooden study table in great condition.",
    category: "Furniture",
    price: 1200,
    image: "https://via.placeholder.com/150",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Red T-Shirt",
    description: "Comfortable cotton t-shirt",
    category: "Clothing",
    price: 15,
    image: "https://via.placeholder.com/150",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Bluetooth Headphones",
    description: "Noise-cancelling headphones",
    category: "Electronics",
    price: 60,
    image: "https://via.placeholder.com/150",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Coffee Mug",
    description: "Ceramic coffee mug",
    category: "Kitchen",
    price: 8,
    image: "https://via.placeholder.com/150",
    status: "available",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Populate database
const populateProducts = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    await collection.deleteMany({});         // remove old products
    const result = await collection.insertMany(staticProducts); // insert new
    res.json(result.insertedIds);            // return generated IDs
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    const { category, minPrice, maxPrice, search, status } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (search) filter.title = { $regex: search, $options: "i" };

    const products = await collection.find(filter).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    const { title, description, category, price, image, status } = req.body;

    // Basic validation
    if (!title || !description || !category || !price) {
      return res.status(400).json({ message: "Title, description, category, and price are required" });
    }

    const newProduct = {
      title,
      description,
      category,
      price,
      image: image || "https://via.placeholder.com/150", // default image
      status: status || "available",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newProduct);
    res.status(201).json({ message: "Product added successfully", productId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  populateProducts,
  getProducts,
    addProduct
};
