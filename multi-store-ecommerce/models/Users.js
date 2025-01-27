const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'store_admin', 'customer'),
        defaultValue: 'customer',
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'pending'),
        defaultValue: 'customer',
      },
      store_ids: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.INTEGER, 
        defaultValue: 0,
      },
    }, {
      sequelize,
      modelName: 'Users',
      tableName: 'Users',
      timestamps: true,
    });
  }
}

module.exports = Users;
