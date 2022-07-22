const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    id: Number,
    brand: String,
    model: String,
    type: String,
    price: Number,
});
const Product = mongoose.model("Products", productSchema);
module.exports = Product;