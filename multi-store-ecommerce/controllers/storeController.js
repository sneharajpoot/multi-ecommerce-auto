// controllers/storeController.js

const db = require('../models'); // Correct path to models
const { Stores } = db;

/**
 * Register a new store.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.registerStore = async (req, res) => {
  const { name, currency, timezone } = req.body;
  const ownerId = req.user.id; // Assuming the authenticated user is the store admin

  try {
    // Create the store
    const store = await Stores.create({
      name,
      ownerId,
      currency,
      timezone,
    });

    return res.status(201).json(store);
  } catch (error) {
    console.error('Error registering store:', error.message);
    return res.status(500).json({ error: 'Failed to register store' });
  }
};

/**
 * Approve a store by admin.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.approveStore = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Stores.findByPk(id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    store.isApproved = true;
    await store.save();

    return res.status(200).json({ message: 'Store approved successfully', store });
  } catch (error) {
    console.error('Error approving store:', error.message);
    return res.status(500).json({ error: 'Failed to approve store' });
  }
};

/**
 * Activate a store by admin or store admin.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.activateStore = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Stores.findByPk(id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    store.status = 'active';
    await store.save();

    return res.status(200).json({ message: 'Store activated successfully', store });
  } catch (error) {
    console.error('Error activating store:', error.message);
    return res.status(500).json({ error: 'Failed to activate store' });
  }
};

/**
 * Deactivate a store by admin or store admin.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.deactivateStore = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Stores.findByPk(id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    store.status = 'inactive';
    await store.save();

    return res.status(200).json({ message: 'Store deactivated successfully', store });
  } catch (error) {
    console.error('Error deactivating store:', error.message);
    return res.status(500).json({ error: 'Failed to deactivate store' });
  }
};

/**
 * Get all stores.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.getAllStores = async (req, res) => {
  try {
    let stores;
    if (req.user.role === 'admin') {
      stores = await Stores.findAll();
    } else if (req.user.role === 'store_admin') {
      stores = await Stores.findAll({ where: { ownerId: req.user.id } });
    } else {
      return res.status(403).json({ error: 'Access forbidden: Insufficient permissions' });
    }
    return res.status(200).json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error.message);
    return res.status(500).json({ error: 'Failed to fetch stores' });
  }
};

/**
 * Get store by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.getStoreById = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Stores.findByPk(id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    if (req.user.role === 'store_admin' && store.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access forbidden: Not your store' });
    }

    return res.status(200).json(store);
  } catch (error) {
    console.error('Error fetching store:', error.message);
    return res.status(500).json({ error: 'Failed to fetch store' });
  }
};

/**
 * Update store by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.updateStore = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const store = await Stores.findByPk(id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    if (req.user.role === 'store_admin' && store.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access forbidden: Not your store' });
    }

    store.name = name;
    // store.description = description;
    await store.save();

    return res.status(200).json({ message: 'Store updated successfully', store });
  } catch (error) {
    console.error('Error updating store:', error.message);
    return res.status(500).json({ error: 'Failed to update store' });
  }
};

/**
 * Delete store by ID.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
exports.deleteStore = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Stores.findByPk(id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    if (req.user.role === 'store_admin' && store.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access forbidden: Not your store' });
    }

    await store.destroy();
    return res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.error('Error deleting store:', error.message);
    return res.status(500).json({ error: 'Failed to delete store' });
  }
};

// Get store details
exports.getStoreDetails = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await Stores.findByPk(store_id);

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found.' });
    }

    // Check if the user is the owner (store_admin) or a customer
    if (req.user.role === 'store_admin' && req.user.id !== store.owner_id) {
      return res.status(403).json({ success: false, message: 'Access forbidden: Not your store.' });
    }

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const store = await Stores.create(req.body);
    res.status(201).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
