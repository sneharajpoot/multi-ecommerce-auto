import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup, Pagination } from 'react-bootstrap';
import { fetchReviewsByProduct, addReview } from '../api/reviewApi.js';
import { useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';
import StarRating from './StarRating'; // Import the StarRating component

const ReviewList = ({ productId, customerId, showCommect = true }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, review_text: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [filterByUser, setFilterByUser] = useState(false); // Toggle for user-specific reviews

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const customerId = useSelector((state) => state.auth.user?.id);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const queryParams = {
                    page: currentPage,
                    limit: 5,
                    user_id: customerId, // Add user filter if enabled
                };

                const response = await fetchReviewsByProduct(productId, queryParams);

                // Set current user's review if available
                const cReview = response.reviews.find(
                    (review) => review.product_id === productId && review.user_id === customerId
                );

                setNewReview(cReview || { rating: 0, review_text: '' });
                setReviews(response.reviews);
                setTotalPages(response.totalPages);
            } catch (error) {
                showErrorMessage('Error fetching reviews');
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [productId, currentPage]);

    const handleAddReview = async () => {
        try {
            if (!isAuthenticated) {
                showErrorMessage('You must be logged in to add a review');
                return;
            }

            const review = { ...newReview, product_id: productId, user_id: customerId };
            const response = await addReview(productId, review);

            setReviews([...reviews.filter((r) => r.id !== response.review.id), response.review]); // Update or add the review
            showSuccessMessage('Review added successfully');
        } catch (error) {
            showErrorMessage('Error adding review');
            console.error('Error adding review:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleFilterByUser = () => {
        // setFilterByUser(!filterByUser);
        setCurrentPage(1); // Reset to the first page when toggling the filter
    };

    return (
        <div>
            <h5>Add a Review</h5>
            <Form>
                <Form.Group controlId="reviewRating">
                    <Form.Label>Rating</Form.Label>
                    <StarRating
                        rating={newReview.rating}
                        onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                    />
                </Form.Group>
                <Form.Group controlId="reviewText">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newReview.review_text}
                        onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleAddReview}>
                    Submit Review
                </Button>
            </Form>

            {
                showCommect && <div>


                    <h4>Reviews</h4>
                    <ListGroup>
                        {reviews.map((review) => (
                            <ListGroup.Item key={review.id}>
                                <strong>Rating:</strong> {review.rating} / 5 <br />
                                <strong>Comment:</strong> {review.review_text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Pagination>
                        {[...Array(totalPages).keys()].map((page) => (
                            <Pagination.Item
                                key={page + 1}
                                active={page + 1 === currentPage}
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>

                </div>

            }
        </div>
    );
};

export default ReviewList;
