import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const TopBar = () => {
  return (
    <header className="header-section">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <h1 className="logo">E-commerce</h1>
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
            <Button variant="link">Login</Button>
            <Button variant="link">Signup</Button>
            <Button variant="link">Cart (0)</Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default TopBar;
