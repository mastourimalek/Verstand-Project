// 1 require mongoose
const mongoose = require("mongoose");

// schema
const { Schema, model } = mongoose;

// create schema
const OrderSchema = new Schema({
  email: { type: String, required: true},
  productname: { type: String, required: true },
  adress: { type: String, required: true },
  phone: { type: Number, required: true },
});

module.exports = Order = model("order", OrderSchema);
