const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

const Stores = sequelize.define('Stores', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // ...other fields...
});

module.exports = Stores;
