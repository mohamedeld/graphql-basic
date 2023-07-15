const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    quantity:Number,
    imageURL:String,
    categoryId:{
        type:mongoose.Schema.ObjectId
    }
});

module.exports = mongoose.model("Product",productSchema);