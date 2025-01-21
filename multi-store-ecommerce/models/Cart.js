const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cart extends Model {}

Cart.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customers',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  variant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ProductVariants',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Cart',
  tableName: 'Cart',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Cart;