const mongoose = require("mongoose");

<<<<<<< HEAD
const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
}, {timestamps: true});


module.exports = mongoose.model("Product", ProductSchema)
=======
const ProductSchema = new mongoose.Schema(
    {
        image: String,
        title: String,
        description: String,
        category: String,
        brand: String,
        price: Number,
        salePrice: Number,
        totalStock: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
>>>>>>> c72a9a04b67ac44e17c9f6282adcd0dbf4c1ddd4
