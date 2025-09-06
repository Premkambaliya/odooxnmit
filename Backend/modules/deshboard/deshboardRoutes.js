const express = require("express");
const { createUser, updateUser, deleteUser } = require("./deshboardController");

const router = express.Router();

router.post("/user", createUser);         // Create   // Read
router.put("/user/:id", updateUser);      // Update
router.delete("/user/:id", deleteUser);   // Delete

module.exports = router;
