const { Model, DataTypes } = require('sequelize');

class Orders extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shipping_address_history_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tracking_number: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'Orders',
      tableName: 'Orders',
      timestamps: true,
    });
  }
}

module.exports = Orders;
