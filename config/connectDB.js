// 1 require mongoose
const mongoose = require("mongoose");

// 2 connectDB
const connectDB = async()=>{
    try {
        mongoose.set("strictQuery",false);
        await mongoose.connect(process.env.DB_URI ,{ useNewUrlParser : true});
        console.log("Database connected...")
    } catch (error) {
     console.log("Database is not connected !!!",error)   
    }
}

// 3 export
module.exports=connectDB;