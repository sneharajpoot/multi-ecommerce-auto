const { Category } = require('../models');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, message: 'Category created successfully.', data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Category.update(req.body, { where: { id } });
        res.status(200).json({ success: true, message: 'Category updated successfully.', updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Category deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
