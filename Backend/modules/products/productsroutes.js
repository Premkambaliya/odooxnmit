const express = require("express");
const router = express.Router();
const productController = require("./productcontrollers");

router.get("/populate", productController.populateProducts); // populate static products
router.get("/getproducts", productController.getProducts);              // get all products
router.post("/addproduct", productController.addProduct);           // add new product
module.exports = router;
