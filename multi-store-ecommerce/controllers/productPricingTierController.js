/**
 * File: controllers/productPricingTierController.js
 * Description: Handles operations for product pricing tiers (create, read, update, delete).
 */

const { ProductPricingTier } = require('../models');

/**
 * Add a new pricing tier for a product.
 * @route POST /api/product-pricing-tiers
 * @access Admin, Store Admin
 */
exports.addPricingTier = async (req, res) => {
    try {
        const pricingTier = await ProductPricingTier.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Pricing tier added successfully.',
            data: pricingTier,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all pricing tiers for a specific product.
 * @route GET /api/product-pricing-tiers/:product_id
 * @access Admin, Store Admin
 */
exports.getPricingTiers = async (req, res) => {
    try {
        const { product_id } = req.params;
        const pricingTiers = await ProductPricingTier.findAll({ where: { product_id } });
        res.status(200).json({ success: true, data: pricingTiers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Update an existing pricing tier.
 * @route PATCH /api/product-pricing-tiers/:id
 * @access Admin, Store Admin
 */
exports.updatePricingTier = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ProductPricingTier.update(req.body, { where: { id } });
        if (updated[0] === 0) {
            return res.status(404).json({ success: false, message: 'Pricing tier not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Pricing tier updated successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete an existing pricing tier.
 * @route DELETE /api/product-pricing-tiers/:id
 * @access Admin, Store Admin
 */
exports.deletePricingTier = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductPricingTier.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Pricing tier not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Pricing tier deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
