const db = require('../models'); // Adjust path as needed
const { Review, Comment } = db;

// Add a review for a product
exports.addReview = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { user_id, rating, review_text } = req.body;

    // Check if a review exists for the given product and user
    const existingReview = await Review.findOne({ where: { product_id, user_id } });

    if (existingReview) {
      // Update the existing review
      existingReview.rating = rating;
      existingReview.review_text = review_text;
      await existingReview.save();

      res.status(200).json({ 
        success: true, 
        message: 'Review updated successfully', 
        review: existingReview 
      });
    } else {
      // Add a new review
      const newReview = await Review.create({ product_id, user_id, rating, review_text });
      res.status(201).json({ 
        success: true, 
        message: 'Review added successfully', 
        review: newReview 
      });
    }
  } catch (error) {
    console.error('Error adding/updating review:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error' 
    });
  }
};


exports.getReviewsByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { limit = 10, offset = 0, user_id } = req.query; // Default limit = 10, offset = 0

    const whereClause = { product_id };
    if (user_id) {
      whereClause.user_id = user_id; // Add user filter if provided
    }

    // Fetch reviews with pagination
    const { count, rows: reviews } = await Review.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['created_at', 'DESC']], // Order by latest reviews
    });

    res.status(200).json({
      success: true,
      reviews,
      totalReviews: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Math.ceil(offset / limit) + 1,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
