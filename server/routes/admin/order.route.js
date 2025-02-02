const express = require("express");
const {getAllOrdersAllUsers, getOrderDetailsForAdmin} = require("../../controllers/admin/order.controller")

const router = express.Router();

router.get("/get", getAllOrdersAllUsers)
router.get("/details/:id", getOrderDetailsForAdmin)

module.exports = router;