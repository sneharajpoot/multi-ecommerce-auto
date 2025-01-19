const express = require('express');
const router = express.Router();
const { createModule, getAllModules, getModuleById, updateModule, deleteModule } = require('../controllers/moduleController');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for Module
const moduleValidation = {
  name: 'required|string',
  description: 'string',
};

/**
 * @swagger
 * /api/modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Module created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', validateRequest(moduleValidation), createModule);

/**
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: List of modules
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllModules);

/**
 * @swagger
 * /api/modules/{id}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the module
 *     responses:
 *       200:
 *         description: Module details
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getModuleById);

/**
 * @swagger
 * /api/modules/{id}:
 *   put:
 *     summary: Update a module
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateRequest(moduleValidation), updateModule);

/**
 * @swagger
 * /api/modules/{id}:
 *   delete:
 *     summary: Delete a module
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the module
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteModule);

module.exports = router;

