const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        let product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found!",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, item: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (!findCurrentProductIndex === -1) {
            cart.item.push({ productId, quantity });
        } else {
            cart.item[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding cart",
        });
    }
};

const getCartItems = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting cart items",
        });
    }
};

const updateCartItemQty = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating cart item quantity",
        });
    }
};

const deleteCartItem = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting cart item",
        });
    }
};

module.exports = {
    addCart,
    getCartItems,
    updateCartItemQty,
    deleteCartItem,
};
