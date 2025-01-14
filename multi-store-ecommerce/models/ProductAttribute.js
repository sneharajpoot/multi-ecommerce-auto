const { Model, DataTypes } = require('sequelize');

class ProductAttribute extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      attributeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attributeValue: {
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
    }, {
      sequelize,
      modelName: 'ProductAttribute',
      tableName: 'productAttributes',
      timestamps: true,
    });
  }
}

module.exports = ProductAttribute;
