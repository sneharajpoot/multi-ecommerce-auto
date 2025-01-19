import React, { useState, useEffect } from 'react';
import { fetchProductById, updateProduct } from '../api/productApi'; // Import the API functions
import { addProductMetadata, updateProductMetadata } from '../api/productMetadataApi'; // Import the API functions for adding and updating product metadata
import { addProductAttributes, updateProductAttributes } from '../api/productAttributesApi'; // Import the API functions for adding and updating product attributes
import { fetchStores } from '../api/storeApi'; // Import the API function for fetching stores
import { fetchCategories } from '../api/categoryApi'; // Import the API function for fetching categories
import { useHistory, useParams } from 'react-router-dom'; // Import useHistory and useParams for navigation

const UpdateProduct = ({ onProductUpdated }) => {
  const { id } = useParams(); // Get the product ID from the URL
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
    const getProduct = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetchProductById(id);
        const productData = response.data.product[0];
        setProduct({
          id: productData.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          sku: productData.sku,
          category_id: productData.category_id,
          store_id: productData.store_id
        });
        setMetadata(response.data.productMetadata);
        setAttributes(response.data.productAttributes);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

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

    getProduct();
    getStores();
    getCategories();
  }, [id]);

  const handleSaveProduct = async () => {
    setLoading(true); // Set loading to true
    try {
      await updateProduct(product.id, product);
      setMessage('Product updated successfully!');
      setError('');
      setStep(step + 1); // Move to the next step
    } catch (error) {
      setError('Error updating product.');
      setMessage('');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleSaveMetadata = async () => {
    setLoading(true); // Set loading to true
    try {
      const metadataWithProductId = metadata.map(data => ({ ...data, productId: product.id }));
      await updateProductMetadata(product.id, metadataWithProductId);
      setMessage('Product metadata updated successfully!');
      setError('');
      setStep(step + 1); // Move to the next step
    } catch (error) {
      setError('Error updating product metadata.');
      setMessage('');
      console.error('Error updating product metadata:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleSaveAttributes = async () => {
    setLoading(true); // Set loading to true
    try {
      const attributesWithProductId = attributes.map(data => ({ ...data, productId: product.id }));
      await updateProductAttributes(product.id, attributesWithProductId);
      setMessage('Product attributes updated successfully!');
      setError('');
      setStep(step + 1); // Move to the next step
    } catch (error) {
      setError('Error updating product attributes.');
      setMessage('');
      console.error('Error updating product attributes:', error);
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
    { step: 1, label: 'Step 1 Update Product' },
    { step: 2, label: 'Step 2 Metadata' },
    { step: 3, label: 'Step 3 Attributes' },
    { step: 4, label: 'Step 4 Product Updated Successfully' }
  ];

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <div>
      <ul className="nav nav-pills mb-3">
        {steps.map(s => (
          <li className="nav-item" key={s.step}>
            <button
              className={`nav-link ${step === s.step ? 'active' : ''}`}
              onClick={() => handleStepChange(s.step)}
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
          <button type="button" className="btn btn-primary" onClick={handleSaveProduct} disabled={loading}>
            Update Product
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
        </form>
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
          <button type="button" className="btn btn-primary" onClick={handleSaveMetadata} disabled={loading}>Save Metadata</button>
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
          <button type="button" className="btn btn-primary" onClick={handleSaveAttributes} disabled={loading}>Save Attributes</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Product, metadata, and attributes updated successfully!</p>
          <button type="button" className="btn btn-primary" onClick={handleCancel}>Back to Product List</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
