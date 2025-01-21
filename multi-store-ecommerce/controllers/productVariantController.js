// const { ProductVariant } = require('../models');
const db = require('../models'); // Correct path to models
const { v4: uuidv4 } = require('uuid');
const { Product_Variants } = db;

// Get all product variants
exports.getProductVariants = async (req, res) => {
  try {
    let productId = req.query.productId;
    if (productId) {
      const productVariants = await Product_Variants.findAll({ where: { product_id: productId } });
      return res.status(200).json(productVariants);
    }
    const productVariants = await Product_Variants.findAll();
    res.status(200).json(productVariants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Add or update product variants
exports.addOrUpdateProductVariants = async (req, res) => {
  const { productId } = req.params;
  const variants = req.body; 

  if (!Array.isArray(variants)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }

  try {
    const existingVariants = await Product_Variants.findAll({ where: { product_id: productId } });
    const existingVariantIds = existingVariants.map(variant => variant.id);

    const updatedVariants = await Promise.all(
      variants.map(async (variant) => {
        const { id, name, sku, price, stock } = variant;

        if (id === 0) {
          // Create new variant
          return await Product_Variants.create({ product_id: productId, name, sku, price, stock });
        } else {
          // Update existing variant
          const existingVariant = await Product_Variants.findByPk(id);
          if (existingVariant) {
            existingVariant.name = name;
            existingVariant.sku = sku;
            existingVariant.price = price;
            existingVariant.stock = stock;
            await existingVariant.save();
            return existingVariant;
          }
        }
      })
    );

    // Delete variants not present in the request body
    const variantIdsToDelete = existingVariantIds.filter(id => !variants.some(variant => variant.id === id));
    await Product_Variants.destroy({ where: { id: variantIdsToDelete } });

    res.status(200).json({ message: 'Product variants updated successfully', variants: updatedVariants });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
// Add a new product variant
exports.addProductVariant = async (req, res) => {
  let { productId } = req.params;
  const { product_id, name, sku, price, stock } = req.body;

  try {
    const newProductVariant = await Product_Variants.create({ product_id, name, sku, price, stock });
    res.status(201).json({ message: 'Product variant added successfully', variant: newProductVariant });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update a product variant
exports.updateProductVariant = async (req, res) => {
  const { id } = req.params;
  const { name, sku, price, stock } = req.body;

  try {
    const productVariant = await Product_Variants.findByPk(id);

    if (!productVariant) {
      return res.status(404).json({ error: 'Product variant not found' });
    }

    Product_Variants.name = name;
    Product_Variants.sku = sku;
    Product_Variants.price = price;
    Product_Variants.stock = stock;

    await Product_Variants.save();

    res.status(200).json({ message: 'Product variant updated successfully', variant: productVariant });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete a product variant
exports.deleteProductVariant = async (req, res) => {
  const { id } = req.params;

  try {
    const productVariant = await Product_Variants.findByPk(id);

    if (!productVariant) {
      return res.status(404).json({ error: 'Product variant not found' });
    }

    await Product_Variants.destroy();

    res.status(200).json({ message: 'Product variant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};