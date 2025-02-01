const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProductMetadata extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        key: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.STRING,
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
      },
      {
        sequelize,
        modelName: 'ProductMetadata',
        tableName: 'ProductMetadata',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Products, { foreignKey: 'product_id', as: 'product' });
  }
}

module.exports = ProductMetadata;
