const express = require("express");
const {getAllOrdersAllUsers, getOrderDetailsForAdmin, updateOrderStatus} = require("../../controllers/admin/order.controller")

const router = express.Router();

router.get("/get", getAllOrdersAllUsers)
router.get("/details/:id", getOrderDetailsForAdmin)
router.put("/update/:id", updateOrderStatus);

module.exports = router;