const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product_Images extends Model {
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
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_primary: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
        modelName: 'Product_Images',
        tableName: 'Product_Images',
        timestamps: true,
      }
    );
  }
 
}

module.exports = Product_Images;

 