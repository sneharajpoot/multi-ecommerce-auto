const db = require('../models');
const { Category } = db;

/**
 * Create a new category.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.createCategory = async (req, res) => {
  const { name,description } = req.body;

  try {
    const category = await Category.create({ name,description });
    return res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error.message);
    return res.status(500).json({ error: 'Failed to create category' });
  }
};

/**
 * Get all categories.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

/**
 * Get category by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error.message);
    return res.status(500).json({ error: 'Failed to fetch category' });
  }
};

/**
 * Update category by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name,description } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;
    category.description = description;
    
    await category.save();

    return res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error.message);
    return res.status(500).json({ error: 'Failed to update category' });
  }
};

/**
 * Delete category by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error.message);
    return res.status(500).json({ error: 'Failed to delete category' });
  }
};

/**
 * Toggle the status of a category.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.toggleCategoryStatus = async (req, res) => {
  console.log('toggleCategoryStatus');
  const { id } = req.params;
  const { status } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.status = !category.status;
    let resr = await category.save();
    console.log('res', resr);

    return res.status(200).json({ message: 'Category status updated successfully', category });
  } catch (error) {
    console.error('Error updating category status:', error.message);
    return res.status(500).json({ error: 'Failed to update category status' });
  }
};
