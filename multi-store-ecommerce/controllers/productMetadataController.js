const { ProductMetadata } = require('../models');

exports.addProductMetadata = async (req, res) => {
    try {
        const metadata = await ProductMetadata.create(req.body);
        res.status(201).json({ success: true, message: 'Product metadata added successfully.', data: metadata });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProductMetadata = async (req, res) => {
    try {
        const { product_id } = req.params;
        const metadata = await ProductMetadata.findAll({ where: { product_id } });
        res.status(200).json({ success: true, data: metadata });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProductMetadata = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ProductMetadata.update(req.body, { where: { id } });
        res.status(200).json({ success: true, message: 'Product metadata updated successfully.', updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProductMetadata = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductMetadata.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Product metadata deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
