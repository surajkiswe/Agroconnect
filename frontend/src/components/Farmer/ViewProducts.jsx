import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ✅ Import

const ViewProducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // ✅ Initialize
    const fid = localStorage.getItem("fid");

    // Load categories
    useEffect(() => {
        axios.get("http://localhost:8081/category/getall")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories", err));
    }, []);

    // Handle category change
    const handleCategoryChange = async (e) => {
        const cid = e.target.value;
        setSelectedCategory(cid);
        setVendors([]);

        if (!cid) return;

        setLoading(true);

        try {
            // Find the selected category object
            const selectedCatObj = categories.find(cat => cat.cid === parseInt(cid));

            // Step 1: Get products by category
            const productRes = await axios.get(`http://localhost:8081/product/bycid/${cid}`);
            const products = productRes.data;

            // Step 2: Decide API endpoint based on category name
            const vendorPromises = products.map(prod => {
                if (selectedCatObj?.cname === "Farming Tools") {
                    // Call rental API
                    return axios.get(`http://localhost:8081/productrental/getbyprodid/${prod.prodid}`)
                        .then(rentalRes => rentalRes.data.map(r => ({
                            ...r,
                            product: prod,
                            type: "rental"
                        })));
                } else {
                    // Call normal vendor API
                    return axios.get(`http://localhost:8081/productvendor/getbyprodid/${prod.prodid}`)
                        .then(vendorRes => vendorRes.data.map(v => ({
                            ...v,
                            product: prod,
                            type: "vendor"
                        })));
                }
            });

            const vendorsNested = await Promise.all(vendorPromises);
            const vendorsFlat = vendorsNested.flat();

            setVendors(vendorsFlat);
        } catch (err) {
            console.error("Error fetching product vendors/rentals", err);
        } finally {
            setLoading(false);
        }
    };

    // Add to cart
    const handleAddToCart = (pvid) => {
        const cartData = {
            productvendor: { pvid },
            prorid: null,
            farmer: { fid: parseInt(fid) },
            quantity: 1
        };

        axios.post("http://localhost:8081/cart/add", cartData)
            .then(() => alert("Product added to cart"))
            .catch(err => console.error("Error adding to cart", err));
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">View Products</h2>

            {/* Category Selection */}
            <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="2" className="fw-bold">Select Category</Form.Label>
                <Col sm="6">
                    <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">-- Select Category --</option>
                        {categories.map(cat => (
                            <option key={cat.cid} value={cat.cid}>{cat.cname}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>

            {loading && <div className="text-center"><Spinner animation="border" /></div>}

            {/* Vendors List */}
            <Row>
                {vendors.map(vendor => (
                    <Col key={vendor.pvid || vendor.prorid} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "15px" }}>
                            <Card.Body>
                                <Card.Title className="fw-bold">{vendor.product.pname}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Brand: {vendor.product.bid?.bname || "N/A"}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Vendor: {vendor.vid?.companyname || "N/A"}
                                </Card.Subtitle>
                                <Card.Text>{vendor.product.pdescription}</Card.Text>
                                <Card.Text className="fw-bold text-success">
                                    {vendor.type === "rental"
                                        ? `Rent/Day: ₹${vendor.rateperday?.toFixed(2) || "N/A"}`
                                        : `Price/Kg: ₹${vendor.price?.toFixed(2) || "N/A"}`}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-transparent border-0">
                                <Button
                                    variant="primary"
                                    className="w-100"
                                    onClick={() => handleAddToCart(vendor.pvid)}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Back to Dashboard Button */}
            <div className="text-center mt-4">
                <Button variant="secondary" onClick={() => navigate("/farmer/dashboard")}>
                    Back to Dashboard
                </Button>
            </div>
        </Container>
    );
};

export default ViewProducts;
