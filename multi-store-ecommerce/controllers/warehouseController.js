// File: controllers/warehouseController.js

const { Warehouse } = require('../models');

exports.createWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.create(req.body);
        res.status(201).json({ success: true, message: 'Warehouse created successfully.', data: warehouse });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();
        res.status(200).json({ success: true, data: warehouses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Warehouse.update(req.body, { where: { id } });
        res.status(200).json({ success: true, message: 'Warehouse updated successfully.', updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        await Warehouse.destroy({ where: { id } });
        res.status(200).json({ success: true, message: 'Warehouse deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
