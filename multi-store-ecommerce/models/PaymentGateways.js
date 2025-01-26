const { Model, DataTypes } = require('sequelize');

class PaymentGateways extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        type: {
          type: DataTypes.ENUM('razorpay', 'paytm', 'paypal', 'stripe', 'other'),
          allowNull: false,
        },
        api_key: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        api_secret: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: 'PaymentGateways',
        tableName: 'PaymentGateways',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

module.exports = PaymentGateways;
