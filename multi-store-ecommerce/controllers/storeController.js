// controllers/storeController.js

const Store = require('../models/Stores');

// Register a new store by store admin
const registerStore = async (req, res) => {
  try {
    const { name, address, owner } = req.body;

    const newStore = new Store({
      name,
      address,
      owner,
      isApproved: false // Initially, the store is not approved
    });

    await newStore.save();

    res.status(201).json({ message: 'Store registered successfully', store: newStore });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Activate a store by admin
const activateStore = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await Store.findByPk(store_id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found.' });
    }
    store.status = 'active';
    await store.save();
    res.status(200).json({ success: true, message: 'Store activated successfully.', data: { store_id: store.id, status: store.status } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Deactivate a store by admin
const deactivateStore = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await Store.findByPk(store_id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found.' });
    }
    store.status = 'inactive';
    await store.save();
    res.status(200).json({ success: true, message: 'Store deactivated successfully.', data: { store_id: store.id, status: store.status } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get store details
const getStoreDetails = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await Store.findByPk(store_id);

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

// Approve a store by admin
const approveStore = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await Store.findByPk(store_id);

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    store.isApproved = true;
    await store.save();

    res.status(200).json({ message: 'Store approved successfully', store });
  } catch (error) {
    res.status(res.status || 500).json({ error: 'Internal Server Error' });
  }
};

const createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStore,
  registerStore,
  activateStore,
  deactivateStore,
  getStoreDetails,
  approveStore
};
