const express = require("express");
const { createUser, getUsers, updateUser, deleteUser } = require("./deshboardController");

const router = express.Router();

router.post("/user", createUser);         // Create
router.get("/users", getUsers);           // Read
router.put("/user/:id", updateUser);      // Update
router.delete("/user/:id", deleteUser);   // Delete

module.exports = router;
