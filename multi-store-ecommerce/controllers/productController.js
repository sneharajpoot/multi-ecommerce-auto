const db = require('../models'); // Correct path to models
const { Stores, Products, ProductMetadata, ProductAttribute, Category, Product_Variants } = db;
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {
    const { store_id, name, description, price, sku, status, brand, quantity } = req.body;

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
      brand, 
      quantity
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchProductsOld = async (req, res) => {
  try {
    const { page = 1, limit = 10, store_id, query, category, minPrice, maxPrice, sort } = req.body;
    const offset = (page - 1) * limit;

    let replacements = { limit: parseInt(limit), offset: parseInt(offset) };
    if (store_id) {
      replacements.store_id = store_id;
    } else {
      replacements.store_id = null;
    }

    let conditions = [];
    if (query) {
      conditions.push("(p.name LIKE :query OR p.description LIKE :query)");
      replacements.query = `%${query}%`;
    }
    if (category) {
      conditions.push("p.category_id = :category");
      replacements.category = category;
    }
    if (minPrice) {
      conditions.push("p.price >= :minPrice");
      replacements.minPrice = minPrice;
    }
    if (maxPrice) {
      conditions.push("p.price <= :maxPrice");
      replacements.maxPrice = maxPrice;
    }
    let whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
    let orderBy = "";
    if (sort === "price_asc") {
      orderBy = "ORDER BY p.price ASC";
    } else if (sort === "price_desc") {
      orderBy = "ORDER BY p.price DESC";
    }

    let sql = `
      SELECT 
        p.*,
        c.name as category_name,
        s.name as store_name,
        pi.id as image_id,
        pi.url as image_url,
        pi.is_primary as is_primary_image
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Stores s ON p.store_id = s.id
      LEFT JOIN Product_Images pi ON p.id = pi.product_id
      ${whereClause}
      ${orderBy}
      LIMIT :limit OFFSET :offset
    `;

    const products = await db.sequelize.query(sql,
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
       ${whereClause}`,
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
exports.searchProducts = async (req, res) => {
  try {
    // Destructure and set default values for pagination and filters
    const {
      page = 1,
      limit = 10,
      store_id,
      query,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.body;
    const offset = (page - 1) * limit;

    // Initialize replacements and conditions for query filters
    const replacements = { limit: parseInt(limit), offset: parseInt(offset) };
    const conditions = [];

    // Filter by store_id (optional)
    replacements.store_id = store_id || null;

    // Filter by search query (name or description)
    if (query) {
      conditions.push("(p.name LIKE :query OR p.description LIKE :query)");
      replacements.query = `%${query}%`;
    }

    // Filter by category
    if (category) {
      conditions.push("p.category_id = :category");
      replacements.category = category;
    }

    // Filter by price range
    if (minPrice) {
      conditions.push("p.price >= :minPrice");
      replacements.minPrice = parseFloat(minPrice);
    }
    if (maxPrice) {
      conditions.push("p.price <= :maxPrice");
      replacements.maxPrice = parseFloat(maxPrice);
    }

    // Build where clause
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Sorting logic
    const orderBy = sort === "price_asc"
      ? "ORDER BY p.price ASC"
      : sort === "price_desc"
        ? "ORDER BY p.price DESC"
        : "";

    // Main query for fetching products
    const sql = `
      SELECT 
        p.*,
        c.name AS category_name,
        s.name AS store_name,
        pi.id AS image_id,
        pi.url AS image_url,
        pi.is_primary AS is_primary_image
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Stores s ON p.store_id = s.id
      LEFT JOIN Product_Images pi ON p.id = pi.product_id
      ${whereClause}
      ${orderBy}
      LIMIT :limit OFFSET :offset
    `;

    // Execute the main query
    const products = await db.sequelize.query(sql, {
      replacements,
      type: db.sequelize.QueryTypes.SELECT,
    });

    // Query to get the total count of products
    const countQuery = `
      SELECT COUNT(*) AS count
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Stores s ON p.store_id = s.id
      ${whereClause}
    `;
    const countResult = await db.sequelize.query(countQuery, {
      replacements,
      type: db.sequelize.QueryTypes.SELECT,
    });

    // Extract the total count from the result
    const totalItems = countResult[0]?.count || 0;

    // Respond with paginated products
    res.status(200).json({
      success: true,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

exports.branList = async (req, res) => {
  try {   

    // distince brand list



    const brands = await db.sequelize.query(
      `SELECT DISTINCT p.brand FROM Products p `,
      { 
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
 
    res.status(200).json({ brands });
  } catch (error) {
    console.error('Error fetching brands:', error.message);
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
    const replacements = { limit: parseInt(limit), offset: parseInt(offset) };
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

    // product image 
    const productVariants = await db.sequelize.query(
      `SELECT id, product_id, name, sku, price, stock, created_at, updated_at FROM Product_Variants   WHERE  product_id = :product_id `,
      {
        replacements: { product_id },
        type: db.sequelize.QueryTypes.SELECT,

      }
    )


    if (!product.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product, productAttributes, productMetadata, productImage, productTag, productVariants });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { product, productVariants } = req.body;
    let body = {
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      sku: req.body.sku, 
      category_id: Number(req.body.category_id),
      brand: req.body.brand, 
    }
    console.log('product',  body, product_id);
    // Update product
    const updatedtd = await Products.update(body, { where: { id:product_id } });
    console.log('updatedtd', updatedtd);
    const [updated] = updatedtd
    console.log('updated', product_id, product, productVariants, updated);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const updatedProduct = await Products.findByPk(product_id);

    // Update product variants
    if (productVariants && productVariants.length > 0) {
      await Promise.all(
        productVariants.map(async (variant) => {
          const { id: variantId, ...variantData } = variant;
          const [variantUpdated] = await Product_Variants.update(variantData, { where: { id: variantId, product_id: product_id } });
          if (!variantUpdated) {
            await Product_Variants.create({ ...variantData, product_id: product_id });
          }
        })
      );
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: error.message });
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