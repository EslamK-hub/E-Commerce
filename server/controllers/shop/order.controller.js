const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");

const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        } = req.body;

        const createPaymentJSON = {
            intent: "sale",
            payer: {
                paymentMethod: "paypal",
            },
            redirectUrls: {
                returnUrl: "http://localhost:5173/shop/paypal-return",
                cancelUrl: "http://localhost:5173/shop/paypal-cancel",
            },
            transactions: [
                {
                    itemList: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "description",
                },
            ],
        };

        paypal.payment.create(createPaymentJSON, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: false,
                    message: "Error while creating paypal payment",
                });
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                });

                await newlyCreatedOrder.save();

                const approvalURL = paymentInfo.links.find(
                    (link) => link.rel === "approval_url"
                ).href;
                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating order",
        });
    }
};

const capturePayment = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating order",
        });
    }
};

module.exports = {
    createOrder,
    capturePayment,
};
