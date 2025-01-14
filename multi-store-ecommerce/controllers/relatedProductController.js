const { RelatedProduct } = require('../models');

exports.addRelatedProduct = async (req, res) => {
    try {
        const relatedProduct = await RelatedProduct.create(req.body);
        res.status(201).json({ success: true, message: 'Related product added successfully.', data: relatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRelatedProducts = async (req, res) => {
    try {
        const { product_id } = req.params;
        const relatedProducts = await RelatedProduct.findAll({ where: { product_id } });
        res.status(200).json({ success: true, data: relatedProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteRelatedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await RelatedProduct.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Related product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
