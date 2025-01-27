// controllers/storeController.js

const db = require('../models');
const { Stores, Users } = db;

const registerStore = async (req, res, next) => {
  try {
    const store = await Stores.create(req.body);
    const user = await Users.findByPk(req.user.id);

    if (user) {
      const storeIds = user.store_ids ? user.store_ids.split(',') : [];
      storeIds.push(store.id);
      user.store_ids = storeIds.join(',');
      await user.save();
    }

    res.status(201).json(store);
  } catch (error) {
    next(error);
  }
};

const getAllStores = async (req, res, next) => {
  try {
    const stores = await Stores.findAll();
    res.status(200).json(stores);
  } catch (error) {
    next(error);
  }
};

const getStoreById = async (req, res, next) => {
  try {
    const store = await Stores.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const store = await Stores.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }
    await store.update(req.body);
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    const store = await Stores.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    await store.destroy();

    const user = await Users.findByPk(req.user.id);
    if (user) {
      const storeIds = user.store_ids ? user.store_ids.split(',') : [];
      const updatedStoreIds = storeIds.filter(id => id !== store.id.toString());
      user.store_ids = updatedStoreIds.join(',');
      await user.save();
    }

    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const approveStore = async (req, res, next) => {
  try {
    const store = await Stores.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }
    store.isApproved = true;
    await store.save();
    res.status(200).json(store);
  } catch (error) {
    next(error);
  }
};

const activateStore = async (id) => {
  const store = await Stores.findByPk(id);
  if (!store) {
    throw new Error('Store not found');
  }
  store.status = 'active';
  await store.save();
  return store;
};

const deactivateStore = async (id) => {
  const store = await Stores.findByPk(id);
  if (!store) {
    throw new Error('Store not found');
  }
  store.status = 'inactive';
  await store.save();
  return store;
};

module.exports = {
  registerStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  approveStore,
  activateStore,
  deactivateStore,
};
