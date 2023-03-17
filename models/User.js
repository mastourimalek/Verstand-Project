// 1 require mongoose
const mongoose = require("mongoose");

// schema
const { Schema, model } = mongoose;

// create schema
const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: Number,
  },
  { timestamps: true }
);

module.exports = User = model("user", UserSchema);
