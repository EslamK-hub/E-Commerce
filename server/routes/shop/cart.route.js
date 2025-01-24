const express = require("express");
const {
    addCart,
    getCartItems,
    updateCartItemQty,
    deleteCartItem,
} = require("../../controllers/shop/cart.controller");

const router = express.Router();

router.post("/add", addCart);
router.get("/get/:userId", getCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router; 
