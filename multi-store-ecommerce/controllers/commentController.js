const db = require('../models'); // Adjust path as needed
const { Review, Comment } = db;
 
// Add a comment to a review
exports.addComment = async (req, res) => {
  try {
    const { review_id } = req.params;
    const { user_id, parent_comment_id, comment_text } = req.body;

    // Add a new comment to a review
    const newComment = await Comment.create({ review_id, user_id, parent_comment_id, comment_text });
    res.status(201).json({ success: true, message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all comments for a review
exports.getCommentsByReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    // Fetch comments for the review
    const comments = await Comment.findAll({
      where: { review_id },
      include: [{ model: Comment, as: 'replies', hierarchy: true }], // Include replies for each comment
    });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


    