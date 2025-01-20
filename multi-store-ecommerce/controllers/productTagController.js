/**
 * File: controllers/productTagController.js
 * Description: Handles operations for product tags (add, get, delete).
 */

const { Product_Tags } = require('../models');

/**
 * Add a new tag to a product.
 * @route POST /api/product-tags
 * @access Admin, Store Admin
 */
exports.addProductTag = async (req, res) => {
    try {
        const { product_id, tag } = req.body;
        const newTag = await Product_Tags.create({ product_id: product_id, tag });
        res.status(201).json({
            success: true,
            message: 'Product tag added successfully.',
            data: newTag,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @route GET /api/product-tags/:product_id
 * @access Admin, Store Admin
 */
exports.getProductTags = async (req, res) => {
    try {
        let productId = req.query.productId;
        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required.' });
        }
        const tags = await Product_Tags.findAll({
            where: { product_id: productId },
            attributes: ['id', 'product_id', 'tag', 'createdAt', 'updatedAt']
        }); 

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
        const deleted = await Product_Tags.destroy({ where: { id } });
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
