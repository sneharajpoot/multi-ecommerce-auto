const db = require('../models'); // Correct path to models
const { Stores, Products, ProductMetadata, ProductAttribute, Category } = db;
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {
    const { store_id, name, description, price, sku, status } = req.body;

    // Verify store_id
    const store = await Stores.findByPk(store_id);
    if (!store) {
      return res.status(400).json({ error: 'Invalid store_id' });
    }

    // Check if SKU is unique within the store
    const existingProduct = await Products.findOne({ where: { store_id, sku } });
    if (existingProduct) {
      return res.status(400).json({ error: 'SKU must be unique within the store' });
    }

    const newProduct = await Products.create({
      store_id,
      name,
      description,
      price,
      sku,
      status,
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, store_id, name, quantity } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    
    // if (name) {
    //   where.name = { [Op.like]: `%{name}%` };
    // }
    // if (quantity) {
    //   where.quantity = { [Op.gte]: quantity };
    // }

    // const replacements = { name: `%${name}%`, limit: parseInt(limit), offset: parseInt(offset) };
    const replacements = {  limit: parseInt(limit), offset: parseInt(offset) };
    if (store_id) {
      replacements.store_id = store_id;
    } else {
      replacements.store_id = null;
    }
    // if (quantity) {
    //   replacements.quantity = quantity;
    // } else {
    //   replacements.quantity = 0;
    // }

    const products = await db.sequelize.query(
      `SELECT p.*, c.name as category_name, s.name as store_name
       FROM Products p
       LEFT JOIN Categories c ON p.category_id = c.id
       LEFT JOIN Stores s ON p.store_id = s.id
       WHERE (:store_id IS NULL OR p.store_id = :store_id)   
       LIMIT :limit OFFSET :offset`,
      {
        replacements,
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    const count = await db.sequelize.query(
      `SELECT COUNT(*) as count
       FROM Products p
       LEFT JOIN Categories c ON p.category_id = c.id
       LEFT JOIN Stores s ON p.store_id = s.id
       WHERE (:store_id IS NULL OR p.store_id = :store_id)    `,
      {
        replacements,
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      totalItems: count[0].count,
      totalPages: Math.ceil(count[0].count / limit),
      currentPage: parseInt(page),
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await db.sequelize.query(
      `SELECT p.*  FROM Products p WHERE p.id = :product_id`,
      {
        replacements: { product_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    
    const productAttributes = await db.sequelize.query(
      `SELECT  pa.*  FROM ProductAttributes pa WHERE pa.product_id = :product_id`, 
      {
        replacements: { product_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    
    const productMetadata = await db.sequelize.query(
      `SELECT  pm.*  FROM ProductMetadata pm WHERE pm.product_id = :product_id`,
      {
        replacements: { product_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    // product image 
    const productImage = await db.sequelize.query(
      `SELECT id, product_id ,url ,is_primary, createdAt, updatedAt FROM Product_Images WHERE  product_id = :product_id `,
      {
        replacements: { product_id },
        type: db.sequelize.QueryTypes.SELECT,

      }
    )

      // product image 
      const productTag = await db.sequelize.query(
        `SELECT id , product_id, tag, createdAt, updatedAt FROM Product_Tags   WHERE  product_id = :product_id `,
        {
          replacements: { product_id },
          type: db.sequelize.QueryTypes.SELECT,
  
        }
      )

      
    if (!product.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({product, productAttributes, productMetadata, productImage, productTag});
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const updates = req.body;

    console.log(updates, product_id);
    const product = await Products.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Ensure store_id is not updated
    // if (updates.store_id && updates.store_id !== product.store_id) {
    //   return res.status(400).json({ error: 'store_id cannot be updated' });
    // }

    // Check if SKU is unique within the store if it's being updated and is different from the current SKU
    if (updates.sku && updates.sku !== product.sku) {
      const existingProduct = await Products.findOne({ where: { store_id: product.store_id, sku: updates.sku } });
      if (existingProduct) {
        return res.status(400).json({ error: 'SKU must be unique within the store' });
      }
    }

    Object.assign(product, updates);
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await Products.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};