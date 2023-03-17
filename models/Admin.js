// 1 require mongoose
const mongoose = require("mongoose");

// schema
const { Schema, model } = mongoose;

// create schema
const AdminSchema = new Schema({
  firstname: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
});

module.exports = Admin = model("admin", AdminSchema);
