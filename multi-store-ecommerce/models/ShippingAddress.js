
const { Model, DataTypes } = require('sequelize');
class ShippingAddress extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }, 
            address_line1: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address_line2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: true
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
            modelName: 'ShippingAddress',
            tableName: 'ShippingAddress',
            timestamps: true,
        });
    }
}

module.exports = ShippingAddress;
