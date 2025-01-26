const express = require("express");
const {
    addAddress,
    getAllAddress,
    updateAddress,
    deleteAddress,
} = require("../../controllers/shop/address.controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", getAllAddress);
router.put("/update/:userId/:addressId", updateAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;