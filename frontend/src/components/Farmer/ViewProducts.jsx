import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showViewCart, setShowViewCart] = useState(false);

    // Modal state
    const [showDurationModal, setShowDurationModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [durationDays, setDurationDays] = useState(1);

    const navigate = useNavigate();
    const fid = localStorage.getItem("fid");

    useEffect(() => {
        if (sessionStorage.getItem("hasAddedToCart") === "true") {
            setShowViewCart(true);
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/farmer/category/getall")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories", err));
    }, []);

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
    };

    const handleCategoryChange = async (e) => {
        const cid = e.target.value;
        setSelectedCategory(cid);
        setVendors([]);
        if (!cid) return;

        setLoading(true);
        try {
            const selectedCatObj = categories.find(cat => cat.cid === parseInt(cid));
            const productRes = await axios.get(`http://localhost:8080/farmer/product/bycid/${cid}`);
            const products = productRes.data;

            const vendorPromises = products.map(prod => {
                if (selectedCatObj?.cname === "Farming Tools") {
                    return axios.get(`http://localhost:8080/farmer/productrental/getbyprodid/${prod.prodid}`)
                        .then(rentalRes => rentalRes.data.map(r => ({
                            ...r,
                            product: prod,
                            type: "rental"
                        })));
                } else {
                    return axios.get(`http://localhost:8080/farmer/productvendor/getbyprodid/${prod.prodid}`)
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

    // Open modal only for rental product to input duration days
    const handleAddToCartClick = (vendor) => {
        if (vendor.type === "rental") {
            setSelectedVendor(vendor);
            setDurationDays(1);
            setShowDurationModal(true);
        } else {
            // Directly add vendor product to cart (no durationDays)
            addToCart({ ...vendor, durationDays: null });
        }
    };

    const addToCart = (vendorWithDuration) => {
    const isRental = vendorWithDuration.type === "rental";
    const pricePerUnit = isRental ? vendorWithDuration.rateperday : vendorWithDuration.price;
    const quantity = 1; // currently fixed, you can make it dynamic later

    const totalPrice = isRental
        ? pricePerUnit * (vendorWithDuration.durationDays || 1) * quantity
        : pricePerUnit * quantity;

    const cartData = {
        addedDate: getCurrentDateTime(),
        durationDays: vendorWithDuration.durationDays,
        fid: parseInt(fid),
        prorid: isRental ? vendorWithDuration.prorid : null,
        price: totalPrice,
        pvid: !isRental ? vendorWithDuration.pvid : null,
        quantity: quantity,
    };

    axios.post("http://localhost:8080/farmer/cart/add", cartData)
        .then(() => {
            alert("Product added to cart");
            setShowViewCart(true);
            sessionStorage.setItem("hasAddedToCart", "true");
            setShowDurationModal(false);
            setSelectedVendor(null);
        })
        .catch(err => {
            console.error("Error adding to cart", err);
            alert("Failed to add product to cart. Please try again.");
        });
};


    const handleModalConfirm = () => {
        if (!durationDays || durationDays <= 0) {
            alert("Please enter a valid duration (minimum 1 day).");
            return;
        }
        addToCart({ ...selectedVendor, durationDays });
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">View Products</h2>

            <Form.Group as={Row} className="mb-4" controlId="categorySelect">
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

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            <Row>
                {vendors.map(vendor => (
                    <Col key={vendor.pvid || vendor.prorid} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "15px" }}>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Brand: {vendor.product?.brand?.bname || vendor.product?.brand || "N/A"}
                                </Card.Subtitle>
                                <Card.Title>{vendor.product?.pname || "Product"}</Card.Title>

                                <Card.Subtitle className="mb-2 text-muted">
                                    Vendor: {vendor.vendor?.companyname || vendor.vendor?.vendorname || "N/A"}
                                </Card.Subtitle>
                                <Card.Text>{vendor.product?.pdescription || ""}</Card.Text>
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
                                    onClick={() => handleAddToCartClick(vendor)}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {showViewCart && (
                <div className="text-center my-3">
                    <Button variant="success" onClick={() => navigate("/farmer/cart")}>
                        View Cart
                    </Button>
                </div>
            )}

            <div className="text-center mt-4">
                <Button variant="secondary" onClick={() => navigate("/farmer/dashboard")}>
                    Back to Dashboard
                </Button>
            </div>

            {/* Duration Modal */}
            <Modal show={showDurationModal} onHide={() => setShowDurationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Rental Duration (days)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="durationDaysInput">
                        <Form.Label>Duration (in days):</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={durationDays}
                            onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDurationModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleModalConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ViewProducts;
