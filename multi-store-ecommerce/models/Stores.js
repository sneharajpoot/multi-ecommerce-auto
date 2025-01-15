const { Model, DataTypes } = require('sequelize');

class Stores extends Model {
  static init(sequelize) {
    return super.init(

      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ownerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        currency: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        timezone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: 'inactive',
        },
        isApproved: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      }, {
      sequelize,
      modelName: 'Stores',
      tableName: 'Stores',
      timestamps: true,
    });
  }
}

module.exports = Stores;
