import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <header className="header-section">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <Link to="/">
              <h1 className="logo">E-commerce</h1>
            </Link>
          </Col>
          <Col md={4}>
            <InputGroup>
              <Form.Control
                placeholder="Search for products"
                aria-label="Search for products"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={4} className="text-end">
            <Link to="/login">
              <Button variant="link">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="link">Signup</Button>
            </Link>
            <Link to="/cart">
              <Button variant="link">Cart (0)</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default TopBar;
