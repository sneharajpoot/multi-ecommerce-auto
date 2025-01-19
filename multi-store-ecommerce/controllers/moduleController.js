const db = require('../models'); // Correct path to models
const { Modules } = db;

// Create Module
exports.createModule = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newModule = await Modules.create({ name, description });
    res.status(201).json({ message: 'Module created successfully', module: newModule });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get All Modules
exports.getAllModules = async (req, res) => {
  try {
    console.log('test');
    const modules = await Modules.findAll();
    res.status(200).json(modules);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Get Module by ID
exports.getModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const module = await Modules.findByPk(id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Update Module
exports.updateModule = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const module = await Modules.findByPk(id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    module.name = name;
    module.description = description;
    await module.save();

    res.status(200).json({ message: 'Module updated successfully', module });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// Delete Module
exports.deleteModule = async (req, res) => {
  const { id } = req.params;

  try {
    const module = await Modules.findByPk(id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    await module.destroy();
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
