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
      } 
    }, {
      sequelize,
      modelName: 'Users',
      tableName: 'Users',
      timestamps: true,
    });
  }
}

module.exports = Users;
