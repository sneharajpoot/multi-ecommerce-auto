import React, { useState, useEffect } from 'react';
import { fetchProductTags, addProductTag, updateProductTag } from '../api/productTagApi'; // Import the API functions
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const ProductTags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentTag, setCurrentTag] = useState({ id: null, product_id: '', tag: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getTags = async () => {
            setLoading(true);
            try {
                const response = await fetchProductTags();
                setTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            } finally {
                setLoading(false);
            }
        };

        getTags();
    }, []);

    const handleShowModal = (tag = { id: null, product_id: '', tag: '' }) => {
        setCurrentTag(tag);
        setIsEditing(!!tag.id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTag({ id: null, product_id: '', tag: '' });
    };

    const handleSaveTag = async () => {
        setLoading(true);
        try {
            if (isEditing) {
                await updateProductTag(currentTag.id, currentTag);
            } else {
                await addProductTag(currentTag);
            }
            const response = await fetchProductTags();
            setTags(response.data);
            handleCloseModal();
        } catch (error) {
            console.error('Error saving tag:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h2 className="text-center my-4">Product Tags</h2>
                    <Button variant="primary" onClick={() => handleShowModal()}>Add Tag</Button>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product ID</th>
                                <th>Tag</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.length > 0 ? (
                                tags.map(tag => (
                                    <tr key={tag.id}>
                                        <td>{tag.id}</td>
                                        <td>{tag.product_id}</td>
                                        <td>{tag.tag}</td>
                                        <td>
                                            <Button variant="secondary" onClick={() => handleShowModal(tag)}>Edit</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No tags found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{isEditing ? 'Edit Tag' : 'Add Tag'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formProductId">
                                    <Form.Label>Product ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentTag.product_id}
                                        onChange={(e) => setCurrentTag({ ...currentTag, product_id: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTag">
                                    <Form.Label>Tag</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentTag.tag}
                                        onChange={(e) => setCurrentTag({ ...currentTag, tag: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                            <Button variant="primary" onClick={handleSaveTag} disabled={loading}>
                                {isEditing ? 'Update' : 'Add'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ProductTags;
