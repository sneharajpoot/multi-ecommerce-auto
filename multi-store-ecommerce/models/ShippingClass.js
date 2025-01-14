// File: models/ShippingClass.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ShippingClass extends Model {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      modelName: 'ShippingClass',
      tableName: 'ShippingClasses',
      timestamps: true,
    });
  }
}

module.exports = ShippingClass;
