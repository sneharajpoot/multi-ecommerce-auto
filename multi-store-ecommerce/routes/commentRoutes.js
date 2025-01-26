const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
  
// / Add a comment to a review
router.post('/review/:review_id/comments', commentController.addComment);

// Get all comments for a review
router.get('/review/:review_id/comments', commentController.getCommentsByReview);

module.exports = router;
