const db = require('../models'); // Correct path to models
const { Stores, Products } = db;
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {
    const { store_id, name, description, price, sku, status } = req.body;

    // Verify store_id
    const store = await Stores.findByPk(store_id);
    if (!store) {
      return res.status(400).json({ error: 'Invalid store_id' });
    }

    // Check if SKU is unique within the store
    const existingProduct = await Products.findOne({ where: { store_id, sku } });
    if (existingProduct) {
      return res.status(400).json({ error: 'SKU must be unique within the store' });
    }

    const newProduct = await Products.create({
      store_id,
      name,
      description,
      price,
      sku,
      status,
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, store_id, name, quantity } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (store_id) {
      where.store_id = store_id;
    }
    if (name) {
      where.name = { [Op.like]: `%{name}%` };
    }
    if (quantity) {
      where.quantity = { [Op.gte]: quantity };
    }

    const { count, rows } = await Products.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products: rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Products.findByPk(product_id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const updates = req.body;

    const product = await Products.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Ensure store_id is not updated
    if (updates.store_id && updates.store_id !== product.store_id) {
      return res.status(400).json({ error: 'store_id cannot be updated' });
    }

    // Check if SKU is unique within the store if it's being updated and is different from the current SKU
    if (updates.sku && updates.sku !== product.sku) {
      const existingProduct = await Products.findOne({ where: { store_id: product.store_id, sku: updates.sku } });
      if (existingProduct) {
        return res.status(400).json({ error: 'SKU must be unique within the store' });
      }
    }

    Object.assign(product, updates);
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await Products.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};