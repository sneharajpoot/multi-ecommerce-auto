import React, { useState, useEffect } from 'react';
import { addProduct } from '../api/productApi'; // Import the API function
import { addProductMetadata } from '../api/productMetadataApi'; // Import the API function for adding product metadata
import { addProductAttributes } from '../api/productAttributesApi'; // Import the API function for adding product attributes
import { fetchStores } from '../api/storeApi'; // Import the API function for fetching stores
import { fetchCategories } from '../api/categoryApi'; // Import the API function for fetching categories
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

const AddProduct = ({ onProductAdded }) => {
    const [product, setProduct] = useState({ name: '', description: '', price: '', sku: '', category_id: '', store_id: '' });
    const [metadata, setMetadata] = useState([{ key: '', value: '' }]);
    const [attributes, setAttributes] = useState([{ attributeName: '', attributeValue: '' }]);
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [step, setStep] = useState(1); // Add step state
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
            setProduct({ ...product, id: response.data.id }); // Save the product ID
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
            setStep(4); // Move to final step
        } catch (error) {
            setError('Error adding product attributes.');
            setMessage('');
            console.error('Error adding product attributes:', error);
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

    const steps = [
        { step: 1, label: 'Add Product' },
        { step: 2, label: 'Add Product Metadata' },
        { step: 3, label: 'Add Product Attributes' },
        { step: 4, label: 'Product Added Successfully' }
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
                    <button type="button" className="btn btn-primary" onClick={handleAddProduct} disabled={loading}>Add Product</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
                </form>
            ) : step === 2 ? (
                <form>
                    <div class="row">
                        {metadata.map((data, index) => (
                            <>
                                <div class="col-4">

                                    <div key={index} className="mb-3">
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
                                <div class="col-4">
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
                                <div class="col-4">
                                    <button  type="button" className="btn btn-danger" onClick={() => removeMetadataField(index)}>Remove</button>
                                </div>
                            </>
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
