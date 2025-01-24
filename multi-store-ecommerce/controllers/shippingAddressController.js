const { ShippingAddress } = require('../models');

// Get all shipping addresses
exports.getShippingAddresses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.findAll();
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single shipping address by ID
exports.getShippingAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await ShippingAddress.findByPk(id);
    if (!address) {
      return res.status(404).json({ success: false, message: 'Shipping address not found' });
    }
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new shipping address
exports.addShippingAddress = async (req, res) => {
  try {
    let {customer_id} = req.params;
    let  body = req.body; 
    body.customer_id = customer_id;
    const newAddress = await ShippingAddress.create( body );
    res.status(201).json({ success: true, message: 'Shipping address added successfully', data: newAddress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a shipping address
exports.updateShippingAddress = async (req, res) => {
  try {
    const { address_id } = req.params;
    const [updated] = await ShippingAddress.update(req.body, { where: { id:address_id } });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Shipping address not found' });
    }
    const updatedAddress = await ShippingAddress.findByPk(address_id);
    res.status(200).json({ success: true, message: 'Shipping address updated successfully', data: updatedAddress });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a shipping address
exports.deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ShippingAddress.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Shipping address not found' });
    }
    res.status(200).json({ success: true, message: 'Shipping address deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
