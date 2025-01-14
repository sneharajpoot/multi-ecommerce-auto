const { ProductAttribute } = require('../models');

exports.addProductAttribute = async (req, res) => {
    try {
        const attribute = await ProductAttribute.create(req.body);
        res.status(201).json({ success: true, message: 'Product attribute added successfully.', data: attribute });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProductAttributes = async (req, res) => {
    try {
        const { product_id } = req.params;
        const attributes = await ProductAttribute.findAll({ where: { product_id } });
        res.status(200).json({ success: true, data: attributes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProductAttribute = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ProductAttribute.update(req.body, { where: { id } });
        res.status(200).json({ success: true, message: 'Product attribute updated successfully.', updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProductAttribute = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductAttribute.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Product attribute deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
