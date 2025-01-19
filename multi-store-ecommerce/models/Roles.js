const { Model, DataTypes } = require('sequelize');

class Roles extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            uuid : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roleName : {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
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
            modelName: 'Roles',
            tableName: 'Roles',
            timestamps: true,
        });
    }
}

module.exports = Roles;
