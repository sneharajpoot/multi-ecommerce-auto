const express = require('express');
const router = express.Router();
const { createPermission, listPermissions, updatePermission, deletePermission,
} = require('../controllers/permissionController');

/**
 * Route to create a new permission
 */
router.post('', async (req, res) => {
  try {
    const { action, description } = req.body;
    if (!action) return res.status(400).json({ error: 'Action is required' });

    const permission = await createPermission({ action, description });
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to get a list of permissions
 */
router.get('/', async (req, res) => {
  try {
    const permissions = await listPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to update a permission
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { action, description } = req.body;
    if (!action) return res.status(400).json({ error: 'Action is required' });

    const updatedPermission = await updatePermission({ id, action, description });
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to delete a permission
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deletePermission(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
