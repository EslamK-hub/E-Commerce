// ---------------------------- Add Image ---------------------------- //
const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occurred",
        });
    }
};

// ---------------------------- Add Product ---------------------------- //
const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;
        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        });

        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

// ---------------------------- Get Product ---------------------------- //
const getAllProduct = async (req, res) => {
    try {
        const listProducts = await Product.find({});
        res.status(200).json({ success: true, data: listProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

// ---------------------------- Update Product ---------------------------- //
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;
        const findProduct = await Product.findById(id);
        if (!findProduct) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        findProduct.image = image || findProduct.image;
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price || findProduct.price;
        findProduct.salePrice = salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;

        await findProduct.save();
        res.status(200).json({ success: true, data: findProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

// ---------------------------- Delete Product ---------------------------- //
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};

module.exports = {
    handleImageUpload,
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
};
