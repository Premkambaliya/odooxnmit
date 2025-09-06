const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./auth.env" });

const mongoURI = process.env.MONGO_URI;
const dbName = "Skill_Swap";

let db;

const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // fail fast if cannot connect
    });

    await client.connect();
    db = client.db(dbName);
    console.log("✅ MongoDB connected to", dbName);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop app if DB not connected
  }
};

const getDB = () => {
  if (!db) throw new Error("❌ Database not connected. Call connectToMongoDB() first.");
  return db;
};

module.exports = { connectToMongoDB, getDB };
