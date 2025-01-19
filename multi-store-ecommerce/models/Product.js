const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        category_id: {
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
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        status: {
          type: DataTypes.ENUM('active', 'inactive'),
          defaultValue: 'active',
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.ProductMetadata, { foreignKey: 'product_id', as: 'metadata' });
    this.hasMany(models.ProductAttribute, { foreignKey: 'product_id', as: 'attributes' });
  }
}

module.exports = Product;
