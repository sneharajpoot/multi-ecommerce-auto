const { Model, DataTypes } = require('sequelize');

class Refunds extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        payment_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        refund_transaction_id: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('pending', 'processed', 'failed'),
          defaultValue: 'pending',
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Refunds',
        tableName: 'Refunds',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Payments, { foreignKey: 'payment_id', as: 'payment' });
  }
}

module.exports = Refunds;
