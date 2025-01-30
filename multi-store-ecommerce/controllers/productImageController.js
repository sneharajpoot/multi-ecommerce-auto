const db = require('../models'); // Correct path to models
const { Product_Images } = db;
const { uploadToS3, deleteFromS3 } = require('../utils/s3Utils');
const fs = require('fs');
const path = require('path');

// Add Product Image
exports.addProductImage = async (req, res) => {
  const { productId } = req.params;
  const { is_primary } = req.body;

  try {
    const file = req.file;
    let imageUrl; 

    if (process.env.USE_S3 === 'true') {
      const s3Result = await uploadToS3(file);
      imageUrl = s3Result.Location;
    } else {
      const extraChars = '_extra';
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const newFileName = `${baseName}${extraChars}${ext}`;
      const localPath = path.join(__dirname, '../uploads', newFileName);
      fs.renameSync(file.path, localPath);
      // imageUrl = `/uploads/${newFileName}`;
      imageUrl = `/${newFileName}`;
    }

    // If is_primary is true, set all other images for the product to is_primary = false
    if (is_primary) {
      await Product_Images.update({ is_primary: false }, { where: { product_id: productId } });
    }

    const newImage = await Product_Images.create({
      product_id: productId,
      url:  imageUrl,
      is_primary: is_primary,
    });

    // console.log('newImage', newImage)

    res.status(201).json({ message: 'Product image added successfully', image: newImage });
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get Product Images
exports.getProductImages = async (req, res) => {
  const { productId } = req.params;

  try {
    const images = await Product_Images.findAll({ where: { product_id: productId } });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update Product Image
exports.updateProductImage = async (req, res) => {
  const { id } = req.params;
  const { is_primary } = req.body;

  try {
    const image = await Product_Images.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // If is_primary is true, set all other images for the product to is_primary = false
    if (is_primary) {
      await Product_Images.update({ is_primary: false }, { where: { product_id: image.product_id } });
    }

    image.is_primary = is_primary;
    await image.save();

    res.status(200).json({ message: 'Product image updated successfully', image });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

exports.setprimary = async (req, res) => {
  const { id, productId } = req.params; 

  try {
    const image = await Product_Images.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Product image not found' });
    }

    // Set all other images for the product to is_primary = false
    await Product_Images.update({ is_primary: false }, { where: { product_id: productId } });

    // Set the selected image to is_primary = true
    image.is_primary = true;
    await image.save();

    res.status(200).json({ message: 'Product image updated successfully', image });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// View Uploaded Image
exports.viewUploadedImage = (req, res) => {
  const { imageName } = req.params;
  const imageType =  req.query.imageType; 
  console.log("imageType", imageType)
  console.log("imageName", imageName)

    
  try {
    let localPath = path.join(__dirname, '../uploads', imageName);
  if(imageType == 'banner')
  {
    localPath = path.join(__dirname, '../uploads/banner', imageName);
  }

  console.log("localPath", localPath)
    if (fs.existsSync(localPath)) {
      res.sendFile(localPath);
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete Product Image
exports.deleteProductImage = async (req, res) => {
  const { id, productId } = req.params;

  try {
    const image = await Product_Images.findByPk(id);
    console.log("image", image)
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
