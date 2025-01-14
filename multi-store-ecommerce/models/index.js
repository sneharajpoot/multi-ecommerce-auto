const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql', // Change dialect to MySQL
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models

let failModel = []; // Initialize failModel as an array
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    try {
      console.log(`Loading model: ${file}`);
      const model = require(path.join(__dirname, file));
      if (typeof model.init === 'function') {
        db[model.name] = model.init(sequelize, Sequelize.DataTypes);
      } else {
        console.error(`Model ${file} does not have an init method`);
      }
    } catch (error) {
      failModel.push(file);
      console.error(`Failed to load model: ${file}`, error);
    }
  });

console.log('Failed to load models: ', failModel);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
