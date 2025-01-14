const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
    handleImageUpload,
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
} = require("../../controllers/admin/products.controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", upload.single("my_file"), addProduct);
router.get("/get", upload.single("my_file"), getAllProduct);
router.put("/update/:id", upload.single("my_file"), updateProduct);
router.delete("/delete/:id", upload.single("my_file"), deleteProduct);

module.exports = router;
