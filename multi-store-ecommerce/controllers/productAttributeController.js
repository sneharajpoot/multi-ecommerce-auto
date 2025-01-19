const { ProductAttribute } = require('../models');

exports.addProductAttribute = async (req, res) => {
  try {
    let { productId } = req.params;
    let body = req.body.map((attribute) => ({ ...attribute, productId:productId }));
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
    const updates = req.body;
    let { productId } = req.params;

    const updatedAttributes = [];

    for (const update of updates) {
      const { id, ...data } = update;
      if(id){

      
      const [updated] = await ProductAttribute.update(data, { where: { id } });
      if (updated) {
        const updatedAttribute = await ProductAttribute.findByPk(id);
        updatedAttributes.push(updatedAttribute);
      }
    } else {
      const newAttribute = await ProductAttribute.create({ attributeName:data.attributeName, attributeValue:data.attributeValue, product_id :productId });
      updatedAttributes.push(newAttribute);
    }
 
    }

    res.status(200).json({ success: true, message: 'Product attributes updated successfully.', data: updatedAttributes });
  } catch (error) {
    console.log(error);
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
