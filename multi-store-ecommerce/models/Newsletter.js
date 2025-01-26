const { Model, DataTypes } = require('sequelize');

class Newsletter extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING(191),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true, // Validates that the email field contains a valid email address
          },
        },
        is_subscribed: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        subscribed_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        unsubscribed_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('active', 'unsubscribed'),
          defaultValue: 'active',
        },
      },
      {
        sequelize,
        modelName: 'Newsletter',
        tableName: 'Newsletter',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }
}

module.exports = Newsletter;
