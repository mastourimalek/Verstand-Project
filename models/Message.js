// 1 require mongoose
const mongoose = require("mongoose");

// schema
const { Schema, model } = mongoose;

// create schema
const MessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  message: { type: String, required: true },
});

module.exports = Message = model("message", MessageSchema);
