const Order = require("../models/Order");

// Place Order
exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        const order = await Order.create({
            user: req.user.id,
            items,
            totalAmount
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Logged-in User Orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).populate("items.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Admin: Update Order Status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            message: "Order updated",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};