const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product_Tags extends Model {
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
        tag: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Product_Tags',
        tableName: 'Product_Tags',
        timestamps: true,
      }
    );
  }

}

module.exports = Product_Tags;


