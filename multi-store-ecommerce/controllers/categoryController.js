const { Category } = require('../models');

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCategory = (req, res) => {
    // ...logic to update a category...
    res.status(200).json({ message: 'Category updated successfully' });
};

const deleteCategory = (req, res) => {
    // ...logic to delete a category...
    res.status(200).json({ message: 'Category deleted successfully' });
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};