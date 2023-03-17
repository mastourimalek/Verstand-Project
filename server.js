// 1 require express
const express = require("express");

// 2 create instance
const app = express();

// 5 require dotenv & configure
require("dotenv").config();

// 8 middleware bodyparser
app.use(express.json());

// 6 connect DB
const connectDB = require("./config/connectDB");
connectDB();

// Routing

// 7 routes
app.use("/api/product", require("./routes/product"));
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/order", require("./routes/order"));
app.use("/api/message", require("./routes/message"));



// 3 create port
const PORT = process.env.PORT || 1994;

// 4 create server
app.listen(PORT, (error) => {
  error
    ? console.error(`Failed to connect to the server !!!${error}`)
    : console.log(`Server is running on port ${PORT}...`);
});
