const { Model, DataTypes } = require('sequelize');

class Review extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
      review_text: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      modelName: 'Review',
      tableName: 'Reviews',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }
}

module.exports = Review;
