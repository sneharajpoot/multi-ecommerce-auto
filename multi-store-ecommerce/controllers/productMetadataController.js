// const { ProductMetadata } = require('../models');
const db = require('../models'); // Correct path to models
const { ProductMetadata } = db;
const { Op } = require('sequelize');
// Add product metadata
exports.addProductMetadata = async (req, res) => {
  const metadataArray = req.body;
  const {product_id} = req.params;

  if (!Array.isArray(metadataArray)) {
    return res.status(400).json({ error: 'Request body must be an array' });
  }

  try {
    const createdMetadata = await Promise.all(
      metadataArray.map(async (metadata) => {
        const { key, value } = metadata;
        return await ProductMetadata.create({ productId:product_id, key, value });
      })
    );

    res.status(201).json({ message: 'Product metadata added successfully', metadata: createdMetadata });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
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


// Update product metadata
exports.updateProductMetadata = async (req, res) => {
    const metadataArray = req.body;
    const {product_id} = req.params;
  
    if (!Array.isArray(metadataArray)) {
      return res.status(400).json({ error: 'Request body must be an array' });
    }
  
    try {
      const updatedMetadata = await Promise.all(
        metadataArray.map(async (metadata) => {
          const { id, key, value } = metadata;
          const existingMetadata = await ProductMetadata.findByPk(id);
  
          if (!existingMetadata) {
            throw new Error(`Metadata with id ${id} not found`);
          }
  
          existingMetadata.productId = product_id;
          existingMetadata.key = key;
          existingMetadata.value = value;
  
          return await existingMetadata.save();
        })
      );
  
      res.status(200).json({ message: 'Product metadata updated successfully', metadata: updatedMetadata });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
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
