// File: controllers/bulkUploadLogController.js

const { BulkUploadLog } = require('../models');

exports.createBulkUploadLog = async (req, res) => {
    try {
        const bulkUploadLog = await BulkUploadLog.create(req.body);
        res.status(201).json({ success: true, message: 'Bulk upload log created successfully.', data: bulkUploadLog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBulkUploadLogs = async (req, res) => {
    try {
        const bulkUploadLogs = await BulkUploadLog.findAll();
        res.status(200).json({ success: true, data: bulkUploadLogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateBulkUploadLog = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await BulkUploadLog.update(req.body, { where: { id } });
        res.status(200).json({ success: true, message: 'Bulk upload log updated successfully.', updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteBulkUploadLog = async (req, res) => {
    try {
        const { id } = req.params;
        await BulkUploadLog.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Bulk upload log deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
