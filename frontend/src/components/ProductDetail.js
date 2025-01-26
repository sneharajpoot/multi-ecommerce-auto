import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Modal, Button } from 'react-bootstrap';
import { fetchProductById } from '../api/productApi'; // Correct the import for fetchProductById
import { addCartItem } from '../api/cartApi'; // Import the addCartItem function
import { useSelector } from 'react-redux'; // Import useSelector to get authentication state
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils'; // Import toast functions
import './ProductDetail.css'; // Import the CSS file for styling
import config from '../config';

import ReviewList from './ReviewList'; // Import the ReviewList component
import CommentList from './CommentList'; // Import the CommentList component
const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const customerId = useSelector((state) => state.auth.user?.id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetchProductById(productId);
                const productData = response.data.product;
                const productAttributes = response.data.productAttributes;
                const productMetadata = response.data.productMetadata;
                const productImages = response.data.productImage;
                const productTags = response.data.productTag;
                const productVariants = response.data.productVariants;

                setProduct({
                    ...productData,
                    attributes: productAttributes,
                    metadata: productMetadata,
                    images: productImages,
                    tags: productTags,
                    variants: productVariants,
                });

                // Set the primary image as the selected image
                const primaryImage = productImages.find(img => img.is_primary) || productImages[0];
                setSelectedImage(primaryImage?.url || "https://placehold.jp/600x400");
            } catch (error) {
                showErrorMessage('Error fetching product');
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    const handleZoomClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddToCart = async () => {
        try {
            const item = {
                product_id: product[0].id,
                variant_id: product.variants[0]?.id, // Save the variant ID if available
                quantity: 1,
                name: product[0].name,
                price: product[0].price,
                image: selectedImage
            };
            await addCartItem(item, customerId);
            showSuccessMessage('Product added to cart successfully');
            console.log('Product added to cart');

            // Update cart count in local storage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(item);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.dispatchEvent(new Event('storage')); // Trigger storage event to update cart count
        } catch (error) {
            showErrorMessage('Error adding product to cart');
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={selectedImage ? config.imgBaseUrl + selectedImage : "https://placehold.jp/600x400"} className="large-image" />
                        <div className="zoom-icon" onClick={handleZoomClick}>🔍</div> {/* Zoom icon */}
                    </Card>
                    <div className="image-thumbnails">
                        {product.images.map(img => (
                            <Image
                                key={img.id}
                                src={img.url ? config.imgBaseUrl + img.url : "https://placehold.jp/80x80"}
                                thumbnail
                                className="small-image"
                                onClick={() => handleImageClick(img.url)}
                            />
                        ))}
                    </div>
                </Col>
                <Col md={6}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button> {/* Add to Cart button */}
                    <h4>Attributes:</h4>
                    <ul>
                        {product.attributes.map(attr => (
                            <li key={attr.id}>{attr.attributeName}: {attr.attributeValue}</li>
                        ))}
                    </ul>
                    <h4>Metadata:</h4>
                    <ul>
                        {product.metadata.map(meta => (
                            <li key={meta.id}>{meta.key}: {meta.value}</li>
                        ))}
                    </ul>
                    <h4>Tags:</h4>
                    <ul>
                        {product.tags.map(tag => (
                            <li key={tag.id}>{tag.tag}</li>
                        ))}
                    </ul>
                    <h4>Variants:</h4>
                    <ul>
                        {product.variants.map(variant => (
                            <li key={variant.id}>{variant.name} - ${variant.price} (Stock: {variant.stock})</li>
                        ))}
                    </ul>
                </Col>
            </Row>


            <Container className="mt-5">
                {/* Product details code here */}
                <ReviewList productId={productId} />
            </Container>

            {/* Modal for zoomed image */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body>
                    <Image src={selectedImage ? config.imgBaseUrl + selectedImage : "https://placehold.jp/600x400"} fluid />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ProductDetail;
