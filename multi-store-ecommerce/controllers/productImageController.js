const db = require('../models'); // Correct path to models
const { ProductImage } = db;
const { uploadToS3, deleteFromS3 } = require('../utils/s3Utils');
const fs = require('fs');
const path = require('path');

// Add Product Image
exports.addProductImage = async (req, res) => {
  const { productId } = req.params;
  const { isPrimary } = req.body;

  console.log('---->', productId, isPrimary)

  try {
    const file = req.file;
    let imageUrl;

    if (process.env.USE_S3 === 'true') {
      const s3Result = await uploadToS3(file);
      imageUrl = s3Result.Location;
    } else {
      const localPath = path.join(__dirname, '../uploads', file.filename);
      fs.renameSync(file.path, localPath);
      imageUrl = `/uploads/${file.filename}`;
    }

    // If isPrimary is true, set all other images for the product to is_primary = false
    if (isPrimary) {
      await ProductImage.update({ is_primary: false }, { where: { product_id: productId } });
    }

    const newImage = await ProductImage.create({
      product_id: productId,
      url: imageUrl,
      is_primary: isPrimary,
    });

    res.status(201).json({ message: 'Product image added successfully', image: newImage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get Product Images
exports.getProductImages = async (req, res) => {
  const { productId } = req.params;

  try {
    const images = await ProductImage.findAll({ where: { product_id: productId } });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update Product Image
exports.updateProductImage = async (req, res) => {
  const { id } = req.params;
  const { isPrimary } = req.body;

  try {
    const image = await ProductImage.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // If isPrimary is true, set all other images for the product to is_primary = false
    if (isPrimary) {
      await ProductImage.update({ is_primary: false }, { where: { product_id: image.product_id } });
    }

    image.is_primary = isPrimary;
    await image.save();

    res.status(200).json({ message: 'Product image updated successfully', image });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete Product Image
exports.deleteProductImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await ProductImage.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    if (process.env.USE_S3 === 'true') {
      await deleteFromS3(image.url);
    } else {
      const localPath = path.join(__dirname, '../uploads', path.basename(image.url));
      fs.unlinkSync(localPath);
    }

    await image.destroy();

    res.status(200).json({ message: 'Product image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
