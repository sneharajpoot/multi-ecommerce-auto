const { TaxRule } = require('../models');

/**
 * Create a new tax rule.
 * @route POST /api/tax-rules
 * @access Admin, Store Admin
 */
exports.createTaxRule = async (req, res) => {
    try {
        const taxRule = await TaxRule.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Tax rule created successfully.',
            data: taxRule,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all tax rules.
 * @route GET /api/tax-rules
 * @access Admin, Store Admin
 */
exports.getTaxRules = async (req, res) => {
    try {
        const taxRules = await TaxRule.findAll();
        res.status(200).json({ success: true, data: taxRules });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Update an existing tax rule.
 * @route PATCH /api/tax-rules/:id
 * @access Admin, Store Admin
 */
exports.updateTaxRule = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await TaxRule.update(req.body, { where: { id } });
        if (updated[0] === 0) {
            return res.status(404).json({ success: false, message: 'Tax rule not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Tax rule updated successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete an existing tax rule.
 * @route DELETE /api/tax-rules/:id
 * @access Admin
 */
exports.deleteTaxRule = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await TaxRule.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Tax rule not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Tax rule deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
