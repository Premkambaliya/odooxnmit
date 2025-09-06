const { getDB } = require('../../config/db');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
  try {
    const db = getDB();
    const {
      username,
      email,
      password,
      mobile,
    } = req.body;

    // Basic validation
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate email or username
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // IST Timestamp
    const utcNow = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(utcNow.getTime() + istOffset);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user document
    const newUser = {
      username,
      email,
      mobile,
      password: hashedPassword,
      createdAt: istNow
    };

    const result = await db.collection('users').insertOne(newUser);

    res.status(201).json({
      message: 'User added successfully',
      userId: result.insertedId
    });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getprofile = async (req, res) => {
  try {
    const db = getDB();
    const useremail = req.params.email;
    console.log("useremail is", useremail);

    const user = await db.collection('users').findOne({ email: useremail });
    console.log("user is", user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      mobile: user.mobile, // ✅ Add this line
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { addUser,getprofile };
