/**
 * File: controllers/productReviewController.js
 * Description: Handles operations for product reviews (submit, get, update status, delete).
 */

const { ProductReview } = require('../models');

/**
 * Submit a new product review.
 * @route POST /api/product-reviews
 * @access Customer
 */
exports.submitReview = async (req, res) => {
    try {
        const review = await ProductReview.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Review submitted successfully.',
            data: review,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all reviews for a specific product.
 * @route GET /api/product-reviews/:product_id
 * @access Admin, Store Admin
 */
exports.getProductReviews = async (req, res) => {
    try {
        const { product_id } = req.params;
        const reviews = await ProductReview.findAll({ where: { product_id } });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Update the status of a product review.
 * @route PATCH /api/product-reviews/:id
 * @access Admin, Store Admin
 */
exports.updateReviewStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ProductReview.update(req.body, { where: { id } });
        if (updated[0] === 0) {
            return res.status(404).json({ success: false, message: 'Review not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Review status updated successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete a product review.
 * @route DELETE /api/product-reviews/:id
 * @access Admin, Store Admin
 */
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductReview.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Review not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
