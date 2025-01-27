const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pinCode, phone, notes } = req.body;

        if (!userId || !address || !city || !pinCode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const newlyCreateAddress = new Address({
            userId,
            address,
            city,
            pinCode,
            phone,
            notes,
        });
        await newlyCreateAddress.save();
        res.status(201).json({
            success: true,
            data: newlyCreateAddress,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error adding address",
        });
    }
};

const getAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!",
            });
        }

        const addressList = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: addressList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding address",
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }

        const address = await Address.findOneAndUpdate(
            {
                userId,
                _id: addressId,
            },
            formData,
            { new: true }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            data: address,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding address",
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }

        const address = await Address.findOneAndDelete({
            userId,
            _id: addressId,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding address",
        });
    }
};

module.exports = {
    addAddress,
    getAllAddress,
    updateAddress,
    deleteAddress,
};
