const { Model, DataTypes } = require('sequelize');

class Payments extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        gateway_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        gateway_transaction_id: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'success', 'failed'),
          defaultValue: 'pending',
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Payments',
        tableName: 'Payments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.PaymentGateways, { foreignKey: 'gateway_id', as: 'gateway' });
  }
}

module.exports = Payments;
