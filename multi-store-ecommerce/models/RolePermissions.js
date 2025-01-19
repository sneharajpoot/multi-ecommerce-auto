const { Model, DataTypes } = require('sequelize');

class RolePermissions extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            moduleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            permissionId: {
                type: DataTypes.INTEGER,
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
            modelName: 'RolePermissions',
            tableName: 'RolePermissions',
            timestamps: true,
        });
    }
}

module.exports = RolePermissions;
