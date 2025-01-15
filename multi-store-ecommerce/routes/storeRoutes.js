const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authenticate, authorize, isStoreAdmin } = require('../middlewares/authMiddleware');
const validateRequest = require('../utils/validationMiddleware');

// Validation schema for registering a store
const registerStoreValidation = {
  name: 'required|string',
  currency: 'required|string',
  timezone: 'required|string',
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Store:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         ownerId:
 *           type: integer
 *         currency:
 *           type: string
 *         timezone:
 *           type: string
 *         status:
 *           type: string
 *         isApproved:
 *           type: boolean
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/stores/register:
 *   post:
 *     summary: Register a new store
 *     tags: [Stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               currency:
 *                 type: string
 *               timezone:
 *                 type: string
 *     parameters:
 *       - in: header
 *         name: x-token
 *         required: true
 *         schema:
 *           type: string
 *         description: Custom token
 *     responses:
 *       201:
 *         description: Store created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', authenticate, validateRequest(registerStoreValidation), (req, res, next) => {
  req.body.ownerId = req.user.id;
  storeController.registerStore(req, res, next);
});

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: List of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, authorize('admin', 'store_admin'), storeController.getAllStores);

/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticate, authorize('admin', 'store_admin'), storeController.getStoreById);

/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Update store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Store ID
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
 *         description: Store updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, authorize('admin', 'store_admin'), storeController.updateStore);

/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Delete store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorize('admin', 'store_admin'), storeController.deleteStore);

/**
 * @swagger
 * /api/stores/{id}/approve:
 *   patch:
 *     summary: Approve a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/approve', authenticate, authorize('admin'), storeController.approveStore);

/**
 * @swagger
 * /api/stores/{id}/activate:
 *   patch:
 *     summary: Activate a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/activate', authenticate, authorize('admin', 'store_admin'), storeController.activateStore);

/**
 * @swagger
 * /api/stores/{id}/deactivate:
 *   patch: 
 *     summary: Deactivate a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Store ID
 *     responses:
 *       200:
 *         description: Store deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id/deactivate', authenticate, authorize('admin', 'store_admin'), storeController.deactivateStore);

module.exports = router;
