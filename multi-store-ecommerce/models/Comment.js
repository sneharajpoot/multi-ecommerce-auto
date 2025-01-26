const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parent_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  }
}

module.exports = Comment;
