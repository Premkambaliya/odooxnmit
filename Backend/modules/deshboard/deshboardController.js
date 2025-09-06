const { getDB } = require("../../config/db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

// CREATE user
const createUser = async (req, res) => {
  try {
    const db = getDB();
    const { username, email, mobile, password } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      username,
      email,
      mobile,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// READ users
const getUsers = async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// UPDATE user
// Update user
const updateUser = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { username, email, mobile, password } = req.body;

    if (!username && !email && !mobile && !password) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },   // ✅ Correct
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE user
const deleteUser = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
