const { Model, DataTypes } = require('sequelize');

class Modules extends Model {
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
            description: {
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
            modelName: 'Modules',
            tableName: 'Modules',
            timestamps: true,
        });
    }
}

module.exports = Modules;
