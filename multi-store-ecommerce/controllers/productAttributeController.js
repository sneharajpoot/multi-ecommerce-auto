const { ProductAttribute } = require('../models');

exports.addProductAttribute = async (req, res) => {
  try {
    let { productId } = req.params;
    let body = req.body.map((attribute) => ({ ...attribute, productId: productId }));
    const attributes = await ProductAttribute.bulkCreate(body);
    res.status(201).json({ success: true, message: 'Product attributes added successfully.', data: attributes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductAttributes = async (req, res) => {
  try {
    const { productId } = req.params;
    const attributes = await ProductAttribute.findAll({ where: { productId } });
    res.status(200).json({ success: true, data: attributes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProductAttribute = async (req, res) => {
  try {
    const { productId } = req.params;
    const attributeArray = req.body;

    if (!Array.isArray(attributeArray)) {
      return res.status(400).json({ error: 'Request body must be an array' });
    }

    const existingAttribute = await ProductAttribute.findAll({ where: { product_id: productId } });
    const existingKeys = existingAttribute.map((metadata) => metadata.attributeValue);

    const updatedAttributes = await Promise.all(
      attributeArray.map(async (metadata) => {
        const { id, attributeName, attributeValue } = metadata;
        if (existingKeys.includes(attributeValue)) {
          const existingAttribute = await ProductAttribute.findOne({ where: { product_id: productId, attributeName } });
          existingAttribute.attributeValue = attributeValue;
          return await existingAttribute.save();
        } else {
          return await ProductAttribute.create({ product_id: productId, attributeName, attributeValue });
        }
      })
    );

    const newKeys = attributeArray.map((metadata) => metadata.attributeName);
    const keysToDelete = existingKeys.filter((attributeName) => !newKeys.includes(attributeName));

    await ProductAttribute.destroy({ where: { product_id: productId, attributeName: keysToDelete } });


    res.status(200).json({ success: true, message: 'Product attributes updated successfully.', data: updatedAttributes });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProductAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductAttribute.destroy({ where: { id } });
    res.status(200).json({ success: true, message: 'Product attribute deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
