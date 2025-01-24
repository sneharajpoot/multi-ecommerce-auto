const { ShippingAddressHistory } = require('../models');

// Get all shipping address histories
exports.getShippingAddressHistories = async (req, res) => {
  try {
    const histories = await ShippingAddressHistory.findAll();
    res.status(200).json({ success: true, data: histories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single shipping address history by ID
exports.getShippingAddressHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await ShippingAddressHistory.findByPk(id);
    if (!history) {
      return res.status(404).json({ success: false, message: 'Shipping address history not found' });
    }
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new shipping address history
exports.addShippingAddressHistory = async (req, res) => {
  try {
    const newHistory = await ShippingAddressHistory.create(req.body);
    res.status(201).json({ success: true, message: 'Shipping address history added successfully', data: newHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a shipping address history
exports.updateShippingAddressHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await ShippingAddressHistory.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Shipping address history not found' });
    }
    const updatedHistory = await ShippingAddressHistory.findByPk(id);
    res.status(200).json({ success: true, message: 'Shipping address history updated successfully', data: updatedHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a shipping address history
exports.deleteShippingAddressHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ShippingAddressHistory.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Shipping address history not found' });
    }
    res.status(200).json({ success: true, message: 'Shipping address history deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
