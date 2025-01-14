// File: models/BulkUploadLog.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class BulkUploadLog extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      error_log: {
        type: DataTypes.TEXT,
      },
      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'BulkUploadLog',
      tableName: 'BulkUploadLogs',
      timestamps: true,
    });
  }
}

module.exports = BulkUploadLog;
