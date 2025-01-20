import React, { useState, useEffect } from 'react';
import { addProduct } from '../api/productApi'; // Import the API function
import { addProductMetadata } from '../api/productMetadataApi'; // Import the API function for adding product metadata
import { addProductAttributes } from '../api/productAttributesApi'; // Import the API function for adding product attributes
import { fetchStores } from '../api/storeApi'; // Import the API function for fetching stores
import { fetchCategories } from '../api/categoryApi'; // Import the API function for fetching categories
import { uploadProductImage, deleteProductImage, setPrimaryImage } from '../api/productImageApi'; // Import the API function for uploading and deleting product image
import { addProductTag, deleteProductTag, fetchProductTags } from '../api/productTagApi'; // Import the API function for adding product tags
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import config from '../config';

const AddProduct = ({ onProductAdded }) => {
    const [product, setProduct] = useState({ name: '', description: '', price: '', sku: '', category_id: '', store_id: '' });
    const [metadata, setMetadata] = useState([{ key: '', value: '' }]);
    const [attributes, setAttributes] = useState([{ attributeName: '', attributeValue: '' }]);
    const [tags, setTags] = useState([]); // Add tags state
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [step, setStep] = useState(1); // Add step state
    const [image, setImage] = useState(null); // Add image state
    const [images, setImages] = useState([]); // Add images state
    const [primaryImageIndex, setPrimaryImageIndex] = useState(null); // Add primary image index state
    const [uploadedImages, setUploadedImages] = useState([]); // Add uploaded images state
    const [showTagModal, setShowTagModal] = useState(false); // Add state for showing tag modal
    const [currentTag, setCurrentTag] = useState({ tag: '' }); // Add state for current tag
    const history = useHistory(); // Initialize useHistory

    useEffect(() => {
        const getStores = async () => {
            setLoading(true); // Set loading to true
            try {
                const response = await fetchStores();
                setStores(response);
            } catch (error) {
                console.error('Error fetching stores:', error);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        const getCategories = async () => {
            setLoading(true); // Set loading to true
            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        getStores();
        getCategories();
    }, []);

    const handleAddProduct = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await addProduct(product);
            setProduct({ ...product, id: response.data.product.id }); // Save the product ID
            setMessage('Product added successfully!');
            setError('');
            setStep(2); // Move to step 2 for adding metadata
        } catch (error) {
            setError('Error adding product.');
            setMessage('');
            console.error('Error adding product:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleAddMetadata = async () => {
        setLoading(true); // Set loading to true
        try {
            const metadataWithProductId = metadata.map(data => ({ ...data, productId: product.id }));
            await addProductMetadata(product.id, metadataWithProductId);
            setMessage('Product metadata added successfully!');
            setError('');
            setStep(3); // Move to step 3 for adding attributes
        } catch (error) {
            setError('Error adding product metadata.');
            setMessage('');
            console.error('Error adding product metadata:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleAddAttributes = async () => {
        setLoading(true); // Set loading to true
        try {
            const attributesWithProductId = attributes.map(data => ({ ...data, productId: product.id }));
            await addProductAttributes(product.id, attributesWithProductId);
            setMessage('Product attributes added successfully!');
            setError('');
            setStep(4); // Move to step 4 for uploading image
        } catch (error) {
            setError('Error adding product attributes.');
            setMessage('');
            console.error('Error adding product attributes:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleUploadImage = async () => {
        setLoading(true); // Set loading to true
        try {
            setStep(5); // Move to final step
        } catch (error) {
            console.error('Error uploading product images:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleCancel = () => {
        history.push('/dashboard/products'); // Navigate back to the product list
    };

    const handleMetadataChange = (index, field, value) => {
        const newMetadata = [...metadata];
        newMetadata[index][field] = value;
        setMetadata(newMetadata);
    };

    const addMetadataField = () => {
        setMetadata([...metadata, { key: '', value: '' }]);
    };

    const removeMetadataField = (index) => {
        const newMetadata = metadata.filter((_, i) => i !== index);
        setMetadata(newMetadata);
    };

    const handleAttributeChange = (index, field, value) => {
        const newAttributes = [...attributes];
        newAttributes[index][field] = value;
        setAttributes(newAttributes);
    };

    const addAttributeField = () => {
        setAttributes([...attributes, { attributeName: '', attributeValue: '' }]);
    };

    const removeAttributeField = (index) => {
        const newAttributes = attributes.filter((_, i) => i !== index);
        setAttributes(newAttributes);
    };

    const handleImageChange = async (e) => {
        setLoading(true); // Set loading to true
        try {
            const formData = new FormData();
            Array.from(e.target.files).forEach((file, index) => {
                formData.append('images', file);
                formData.append('is_primary', uploadedImages.length === 0 && index === 0);
            });
            const response = await uploadProductImage(product.id, formData);
            setUploadedImages([...uploadedImages, response.data.image]);
            setMessage('Images uploaded successfully!');
            setError('');
        } catch (error) {
            setError('Error uploading images.');
            setMessage('');
            console.error('Error uploading images:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
        e.target.value = null; // Clear the input value to allow re-uploading the same file
    };

    const handleDeleteImage = async (imageId) => {
        setLoading(true); // Set loading to true
        try {
            await deleteProductImage(product.id, imageId);
            setUploadedImages(uploadedImages.filter(image => image.id !== imageId));
            setMessage('Image deleted successfully!');
            setError('');
        } catch (error) {
            setError('Error deleting image.');
            setMessage('');
            console.error('Error deleting image:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handlePrimaryImageChange = async (index) => {
        setLoading(true); // Set loading to true
        try {
            const imageId = uploadedImages[index].id;
            await setPrimaryImage(product.id, imageId);
            setPrimaryImageIndex(index);
            setMessage('Primary image updated successfully!');
            setError('');
        } catch (error) {
            setError('Error updating primary image.');
            setMessage('');
            console.error('Error updating primary image:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleAddMoreImages = (e) => {
        setImages([...images, ...Array.from(e.target.files)]);
        e.target.value = null; // Clear the input value to allow re-uploading the same file
    };

    const handleShowTagModal = () => {
        setCurrentTag({ tag: '' });
        setShowTagModal(true);
    };

    const handleCloseTagModal = () => {
        setShowTagModal(false);
    };

    const handleSaveTag = async () => {
        setLoading(true);
        try {
            const newTag = { ...currentTag, product_id: product.id };
            await addProductTag(newTag);
            await getTags(product.id);
            // setTags([...tags, newTag]);
            handleCloseTagModal();
        } catch (error) {
            console.error('Error saving tag:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTag = async (id) => {
        setLoading(true);
        try {
            await deleteProductTag(id);
            await getTags(product.id);
        } catch (error) {
            console.error('Error deleting tag:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTags = async (productId) => {
        setLoading(true);
        try {
            const response = await fetchProductTags(productId);
            setTags(response.data?.data ||[] );
        } catch (error) {
            console.error('Error fetching tags:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTagChange = (e) => {
        setCurrentTag({ ...currentTag, tag: e.target.value });
    };

    const steps = [
        { step: 1, label: 'Add Product' },
        { step: 2, label: 'Add Product Metadata' },
        { step: 3, label: 'Add Product Attributes' },
        { step: 4, label: 'Upload Product Image' }, // Add new step for uploading image
        { step: 5, label: 'Product Added Successfully' }
    ];

    return (
        <div>
            <ul className="nav nav-pills mb-3">
                {steps.map(s => (
                    <li className="nav-item" key={s.step}>
                        <button
                            className={`nav-link ${step === s.step ? 'active' : ''}`}
                            onClick={() => setStep(s.step)}
                            disabled={loading || (s.step > step)}
                        >
                            {s.label}
                        </button>
                    </li>
                ))}
            </ul>
            <h2>{steps.find(s => s.step === step).label}</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="loader">Loading...</div>} {/* Add loader */}
            {step === 1 ? (
                <>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="formProductName" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="formProductName"
                                placeholder="Enter product name"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formProductDescription" className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="formProductDescription"
                                placeholder="Enter product description"
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formProductSku" className="form-label">SKU</label>
                            <input
                                type="text"
                                className="form-control"
                                id="formProductSku"
                                placeholder="Enter product sku"
                                value={product.sku}
                                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formProductPrice" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="formProductPrice"
                                placeholder="Enter product price"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formProductCategory" className="form-label">Category</label>
                            <select
                                className="form-control"
                                id="formProductCategory"
                                value={product.category_id}
                                onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formProductStore" className="form-label">Store</label>
                            <select
                                className="form-control"
                                id="formProductStore"
                                value={product.store_id}
                                onChange={(e) => setProduct({ ...product, store_id: e.target.value })}
                            >
                                <option value="">Select Store</option>
                                {stores.map(store => (
                                    <option key={store.id} value={store.id}>{store.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tags</label>
                            <ul>
                                {tags.map((tag, index) => (
                                    <li key={index}>
                                        {tag.tag}
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDeleteTag(tag.id)}>Delete</Button>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="primary" onClick={handleShowTagModal}>Add Tag</Button>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleAddProduct} disabled={loading}>Add Product</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
                    </form>

                    <Modal show={showTagModal} onHide={handleCloseTagModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Tag</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formTag">
                                    <Form.Label>Tag</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter tag"
                                        value={currentTag.tag}
                                        onChange={handleTagChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseTagModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSaveTag}>
                                Save Tag
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : step === 2 ? (
                <form>
                    <div className="row">
                        {metadata.map((data, index) => (
                            <React.Fragment key={index}>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label htmlFor={`metadataKey${index}`} className="form-label">Key</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`metadataKey${index}`}
                                            placeholder="Enter metadata key"
                                            value={data.key}
                                            onChange={(e) => handleMetadataChange(index, 'key', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label htmlFor={`metadataValue${index}`} className="form-label">Value</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`metadataValue${index}`}
                                            placeholder="Enter metadata value"
                                            value={data.value}
                                            onChange={(e) => handleMetadataChange(index, 'value', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-4 d-flex align-items-end">
                                    <button type="button" className="btn btn-danger" onClick={() => removeMetadataField(index)}>Remove</button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={addMetadataField}>Add Metadata Field</button>
                    <button type="button" className="btn btn-primary" onClick={handleAddMetadata} disabled={loading}>Save Metadata</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
                </form>
            ) : step === 3 ? (
                <form>
                    <div className="row">
                        {attributes.map((data, index) => (
                            <React.Fragment key={index}>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label htmlFor={`attributeName${index}`} className="form-label">Attribute Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`attributeName${index}`}
                                            placeholder="Enter attribute name"
                                            value={data.attributeName}
                                            onChange={(e) => handleAttributeChange(index, 'attributeName', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label htmlFor={`attributeValue${index}`} className="form-label">Attribute Value</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`attributeValue${index}`}
                                            placeholder="Enter attribute value"
                                            value={data.attributeValue}
                                            onChange={(e) => handleAttributeChange(index, 'attributeValue', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-4 d-flex align-items-end">
                                    <button type="button" className="btn btn-danger" onClick={() => removeAttributeField(index)}>Remove</button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <button type="button" className="btn btn-secondary" onClick={addAttributeField}>Add Attribute Field</button>
                    <button type="button" className="btn btn-primary" onClick={handleAddAttributes} disabled={loading}>Save Attributes</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
                </form>
            ) : step === 4 ? (
                <form>
                    <div className="mb-3">
                        <label htmlFor="formProductImages" className="form-label">Product Images</label>
                        <input
                            type="file"
                            className="form-control"
                            id="formProductImages"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                    {uploadedImages.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label">Select Primary Image</label>
                            <div className="d-flex flex-wrap">
                                {uploadedImages.map((image, index) => (
                                    <div key={image.id} className="m-2 position-relative">
                                        <img src={config.imgBaseUrl + image.url} alt={`Product ${index}`} width="100" height="100" />
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="primaryImage"
                                                id={`primaryImage${index}`}
                                                checked={primaryImageIndex === index}
                                                onChange={() => handlePrimaryImageChange(index)}
                                            />
                                            <label className="form-check-label" htmlFor={`primaryImage${index}`}>
                                                Primary
                                            </label>
                                        </div>
                                        <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleDeleteImage(image.id)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button type="button" className="btn btn-primary" onClick={handleUploadImage} disabled={loading}>Next</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p>Product, metadata, and attributes added successfully!</p>
                    <button type="button" className="btn btn-primary" onClick={handleCancel}>Back to Product List</button>
                </div>
            )}

        </div>
    );
};

export default AddProduct;
