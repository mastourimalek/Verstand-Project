// 1 require express
const express = require("express");
const isAuthAdmin = require("../middleware/isAuthAdmin");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");


// 2  express router
const router = express.Router();

// Routes

router.post("/add" ,upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Product-Verstand",
    });
    // Create new product
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: result.secure_url,
      price: req.body.price,
      cloudinary_id: result.public_id,
    });
    // save user details in mongodb
    await product.save();
    res
      .status(200)
      .send({ success: [{ msg: "Product added successfully" }], product });
  } catch (error) {
    res.status(400).send({ error: [{ msg: "cannot add product!!!" }], error });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const listProducts = await Product.find();
    res.status(200).send({ msg: "This is the list of product", listProducts });
  } catch (error) {
    res.status(400).send({ msg: "cannot get all product!!!", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productToGet = await Product.findOne({ _id: req.params.id });
    res.status(200).send({ msg: "I get the product", productToGet });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "cannot get the product with this id !!!", error });
  }
});



router.delete("/:id" ,async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
      await product.remove();
    res.status(200).send({ msg: " product deleted" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "cannot delete these product with this id !!!", error });
  }
});



router.put("/:id" ,upload.single("image"), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);
    // Upload new image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder: "Product-Verstand",
    });
    const data = {
      name: req.body.name,
      description: req.body.description,
      image: result.secure_url,
      price: req.body.price,
      cloudinary_id: result.public_id,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true
    });
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

// 3 export
module.exports = router;
