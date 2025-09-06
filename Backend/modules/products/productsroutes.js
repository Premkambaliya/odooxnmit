const express = require("express");
const router = express.Router();
const productController = require("./productcontrollers");

router.get("/populate", productController.populateProducts); // populate static products
router.get("/getproducts", productController.getProducts);              // get all products

module.exports = router;
