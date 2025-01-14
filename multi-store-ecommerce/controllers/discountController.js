/**
 * File: controllers/discountController.js
 * Description: Handles operations for discounts (create, read, update, delete).
 */

const { Discount } = require('../models');

/**
 * Create a new discount.
 * @route POST /api/discounts
 * @access Admin, Store Admin
 */
exports.createDiscount = async (req, res) => {
    try {
        const discount = await Discount.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Discount created successfully.',
            data: discount,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all discounts.
 * @route GET /api/discounts
 * @access Admin, Store Admin
 */
exports.getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.findAll();
        res.status(200).json({ success: true, data: discounts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Update an existing discount.
 * @route PATCH /api/discounts/:id
 * @access Admin, Store Admin
 */
exports.updateDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Discount.update(req.body, { where: { id } });
        if (updated[0] === 0) {
            return res.status(404).json({ success: false, message: 'Discount not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Discount updated successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete a discount.
 * @route DELETE /api/discounts/:id
 * @access Admin
 */
exports.deleteDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Discount.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Discount not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Discount deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
