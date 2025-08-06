import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8084/api/admin/getAllProducts')
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data?.$values) {
                    setProducts(data.$values); // if wrapped in $values (.NET format)
                } else {
                    console.error('Unexpected product format:', data);
                    setProducts([]);
                }
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError('Failed to load products.');
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:8084/api/admin/deleteProduct?prodid=${id}`)
                .then(() => {
                    setProducts(products.filter(prod => prod.prodid !== id));
                })
                .catch((err) => {
                    console.error('Error deleting product:', err);
                    setError('Failed to delete product.');
                });
        }
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header><h4>All Products</h4></Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Brand Name</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((prod) => (
                                <tr key={prod.prodid}>
                                    <td>{prod.brandName}</td>
                                    <td>{prod.pname}</td>
                                    <td>{prod.pdescription}</td>
                                    <td>{prod.categoryName}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleEdit(prod.prodid)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(prod.prodid)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Button
                        onClick={() => navigate('/admin/dashboard')}
                        className="btn btn-secondary mt-3"
                    >
                        ← Back to Dashboard
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AllProducts;
