const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      store: req.user.store // Assuming the store is linked to the authenticated user
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list of products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(product_id, updates, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await Product.findByIdAndDelete(product_id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};