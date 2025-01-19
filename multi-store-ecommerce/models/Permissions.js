const { Model, DataTypes } = require('sequelize');

class Permissions extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            action  : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description : {
                type: DataTypes.STRING,
                allowNull: false,
            }, 
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Permissions',
            tableName: 'Permissions',
            timestamps: true,
        });
    }
}

module.exports = Permissions;
