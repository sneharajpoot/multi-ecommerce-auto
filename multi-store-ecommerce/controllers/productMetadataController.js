const db = require('../models'); // Correct path to models
const { ProductMetadata } = db;
const { Op } = require('sequelize');

// Add product metadata
exports.addProductMetadata = async (req, res) => {
  const metadataArray = req.body;
  const { productId } = req.params;

  if (!Array.isArray(metadataArray)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }

  try {
    const createdMetadata = await Promise.all(
      metadataArray.map(async (metadata) => {
        const { key, value } = metadata;
        return await ProductMetadata.create({ product_id: productId, key, value });
      })
    );

    res.status(201).json({ message: 'Product metadata added successfully', metadata: createdMetadata });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

exports.getProductMetadata = async (req, res) => {
  try {
    const { productId } = req.params;
    const metadata = await ProductMetadata.findAll({ where: { product_id: productId } });
    res.status(200).json({ success: true, data: metadata });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product metadata
exports.updateProductMetadata = async (req, res) => {
  const metadataArray = req.body;
  const { productId } = req.params;

  if (!Array.isArray(metadataArray)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }

  try {
    const existingMetadata = await ProductMetadata.findAll({ where: { product_id: productId } });
    const existingKeys = existingMetadata.map((metadata) => metadata.key);

    const updatedMetadata = await Promise.all(
      metadataArray.map(async (metadata) => {
        const { id, key, value } = metadata;
        if (existingKeys.includes(key)) {
          const existingMetadata = await ProductMetadata.findOne({ where: { product_id: productId, key } });
          existingMetadata.value = value;
          return await existingMetadata.save();
        } else {
          return await ProductMetadata.create({ product_id: productId, key, value });
        }
      })
    );

    const newKeys = metadataArray.map((metadata) => metadata.key);
    const keysToDelete = existingKeys.filter((key) => !newKeys.includes(key));

    await ProductMetadata.destroy({ where: { product_id: productId, key: keysToDelete } });

    res.status(200).json({ message: 'Product metadata updated successfully', metadata: updatedMetadata });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete product metadata
exports.deleteProductMetadata = async (req, res) => {
  const { id } = req.params;

  try {
    const metadata = await ProductMetadata.findByPk(id);
    if (!metadata) {
      return res.status(404).json({ error: 'Metadata not found' });
    }

    await metadata.destroy();
    res.status(200).json({ message: 'Product metadata deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
