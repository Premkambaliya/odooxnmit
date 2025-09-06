const express = require("express");
const { createUser, getUserById, updateUser, deleteUser ,getUserByEmail} = require("./deshboardController");

const router = express.Router();

router.post("/user", createUser);         // Create
router.get("/user/:id", getUserById);     // Read
router.put("/user/:id", updateUser);      // Update
router.delete("/user/:id", deleteUser);   // Delete
router.get("/user", getUserByEmail); 

module.exports = router;
