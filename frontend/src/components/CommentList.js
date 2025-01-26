import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { fetchCommentsByReview, addComment } from '../api/commentApi'; // Adjust the API imports
import { useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';

const CommentList = ({ reviewId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const customerId = useSelector((state) => state.auth.user?.id);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetchCommentsByReview(reviewId);
                setComments(response.data.comments);
            } catch (error) {
                showErrorMessage('Error fetching comments');
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [reviewId]);

    const handleAddComment = async () => {
        try {
            if (!isAuthenticated) {
                showErrorMessage('You must be logged in to add a comment');
                return;
            }
            const comment = { review_id: reviewId, user_id: customerId, comment_text: newComment };
            const response = await addComment(comment);
            setComments([...comments, response.data.comment]);
            showSuccessMessage('Comment added successfully');
            setNewComment(''); // Reset the form
        } catch (error) {
            showErrorMessage('Error adding comment');
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <h4>Comments</h4>
            <ListGroup>
                {comments.map((comment) => (
                    <ListGroup.Item key={comment.id}>
                        {comment.comment_text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
            <h5>Add a Comment</h5>
            <Form>
                <Form.Group controlId="commentText">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleAddComment}>
                    Submit Comment
                </Button>
            </Form>
        </div>
    );
};

export default CommentList;
