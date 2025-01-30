
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Banners extends Model {
  static init(sequelize) {
    return super.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'The title of the banner',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Description or tagline of the banner',
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'URL of the banner image',
    },
    link_url: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'The URL the banner points to when clicked',
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indicates whether the banner is active',
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'The date when the banner becomes active',
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'The date when the banner becomes inactive',
    },
  },
  {
    sequelize,
    modelName: 'Banners',
    tableName: 'Banners',
    timestamps: true, // Enables createdAt and updatedAt
    paranoid: true, // Enables deletedAt (soft delete)
    underscored: true, // Converts camelCase to snake_case in DB columns
  });
}
}

module.exports = Banners;
