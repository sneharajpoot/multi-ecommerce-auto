const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product_Variants extends Model {

  static init(sequelize) {
    return super.init({
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Product_Variants',
      tableName: 'Product_Variants',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });

  }
}

module.exports = Product_Variants;