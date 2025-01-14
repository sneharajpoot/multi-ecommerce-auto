const { Model, DataTypes } = require('sequelize');

class RelatedProduct extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      relatedProductId: {
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
      modelName: 'RelatedProduct',
      tableName: 'relatedProducts',
      timestamps: true,
    });
  }
}

module.exports = RelatedProduct;
