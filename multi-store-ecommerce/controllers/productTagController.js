/**
 * File: controllers/productTagController.js
 * Description: Handles operations for product tags (add, get, delete).
 */

const { ProductTag } = require('../models');

/**
 * Add a new tag to a product.
 * @route POST /api/product-tags
 * @access Admin, Store Admin
 */
exports.addProductTag = async (req, res) => {
    try {
        const tag = await ProductTag.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Product tag added successfully.',
            data: tag,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all tags for a specific product.
 * @route GET /api/product-tags/:product_id
 * @access Admin, Store Admin
 */
exports.getProductTags = async (req, res) => {
    try {
        const { product_id } = req.params;
        const tags = await ProductTag.findAll({ where: { product_id } });
        res.status(200).json({ success: true, data: tags });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete a product tag.
 * @route DELETE /api/product-tags/:id
 * @access Admin, Store Admin
 */
exports.deleteProductTag = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductTag.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Product tag not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Product tag deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
