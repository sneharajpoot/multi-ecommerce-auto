const db = require('../models'); // Import Sequelize models

/**
 * Create a new module.
 */
const createModule = async (data) => {
  const { name, description } = data;
  return await db.Modules.create({ name, description });
};

/**
 * Get all modules.
 */
const getAllModules = async () => {
  return await db.Modules.findAll();
};

/**
 * Get a specific module by ID.
 */
const getModuleById = async (moduleId) => {
  const module = await db.Modules.findByPk(moduleId);
  if (!module) {
    const error = new Error('Module not found');
    error.status = 404;
    throw error;
  }
  return module;
};

/**
 * Update a module by ID.
 */
const updateModule = async (moduleId, data) => {
  const { name, description } = data;
  const module = await db.Modules.findByPk(moduleId);
  if (!module) {
    const error = new Error('Module not found');
    error.status = 404;
    throw error;
  }
  module.name = name || module.name;
  module.description = description || module.description;
  await module.save();
  return module;
};

/**
 * Delete a module by ID.
 */
const deleteModule = async (moduleId) => {
  const module = await db.Modules.findByPk(moduleId);
  if (!module) {
    const error = new Error('Module not found');
    error.status = 404;
    throw error;
  }
  await module.destroy();
};

module.exports = { createModule, getAllModules, getModuleById, updateModule, deleteModule };
