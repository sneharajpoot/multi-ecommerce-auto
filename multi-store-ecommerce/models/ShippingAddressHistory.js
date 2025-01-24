
const { Model, DataTypes } = require('sequelize');
class ShippingAddressHistory extends Model {
    static init(sequelize) {
        return super.init(
            {
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
                customerId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                orderId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                addressLine1: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                addressLine2: {
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
                postalCode: {
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
            modelName: 'ShippingAddressHistory',
            tableName: 'ShippingAddressHistory',
            timestamps: true,
        });
    }
}

module.exports = ShippingAddressHistory;
