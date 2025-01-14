// File: controllers/shippingClassController.js

const { ShippingClass } = require('../models');

exports.createShippingClass = async (req, res) => {
    try {
        const shippingClass = await ShippingClass.create(req.body);
        res.status(201).json({ success: true, message: 'Shipping class created successfully.', data: shippingClass });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getShippingClasses = async (req, res) => {
    try {
        const shippingClasses = await ShippingClass.findAll();
        res.status(200).json({ success: true, data: shippingClasses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateShippingClass = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ShippingClass.update(req.body, { where: { id } });
        res.status(200).json({ success: true, message: 'Shipping class updated successfully.', updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteShippingClass = async (req, res) => {
    try {
        const { id } = req.params;
        await ShippingClass.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Shipping class deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
