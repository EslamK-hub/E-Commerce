const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth.route");

const adminProductsRouter = require("./routes/admin/products.route");
const adminOrderRouter = require("./routes/admin/order.route");

const shopProductsRouter = require("./routes/shop/products.route");
const shopCartRouter = require("./routes/shop/cart.route");
const shopAddressRouter = require("./routes/shop/address.route");
const shopOrderRouter = require("./routes/shop/order.route");
const shopSearchRouter = require("./routes/shop/search.route");
const shopReviewRouter = require("./routes/shop/review.route");

const commonFeatureRouter = require("./routes/common/feature.route");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [process.env.CORS_ORIGIN],
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
