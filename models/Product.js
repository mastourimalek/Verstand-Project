// 1 require mongoose
const mongoose = require("mongoose");
// 2 create schema
const {Schema ,model} = mongoose ;

const productSchema = new Schema ({
    name : {
       type : String ,
        required : true,
    },
    description : {
        type : String ,
        
    },
    image : {
        type : String ,
       // default : "",
    },
    price : Number,
    cloudinary_id: String,
},
{timestamps : true});

module.exports = Product = model ("product", productSchema);