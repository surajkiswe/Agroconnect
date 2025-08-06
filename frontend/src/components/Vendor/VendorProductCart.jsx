// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Table, Container, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const VendorProductCart = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const vidFromRedux = useSelector((state) => state.auth?.vid);
//   const vid = vidFromRedux || localStorage.getItem("vid");

//   useEffect(() => {
//     if (!vid) {
//       setError('Vendor ID not found. Please login again.');
//       return;
//     }

//     localStorage.setItem("vid", vid);

//     const fetchVendorProducts = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8082/productvendor/getbyvid/${vid}`);
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching vendor products:", err);
//         setError("Failed to load your products.");
//       }
//     };

//     fetchVendorProducts();
//   }, [vid]);

//   return (
//     <Container className="mt-4">
//       <Card className="shadow p-4">
//         <h3 className="mb-4">My Products</h3>

//         {error && <Alert variant="danger">{error}</Alert>}

//         {!error && products.length === 0 && <p>Loading products...</p>}

//         {products.length > 0 && (
//           <Table striped bordered hover responsive>
//             <thead className="table-dark">
//               <tr>
//                 <th>Product Name</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Type</th>
//                 <th>Price (₹)</th>
//                 <th>Company</th>
//                 <th>License No</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((item) => (
//                 <tr key={item.pvid}>
//                   <td>{item.prodid?.pname}</td>
//                   <td>{item.prodid?.pdescription}</td>
//                   <td>{item.prodid?.cid?.cname || 'N/A'}</td>
//                   <td>{item.prodid?.cid?.ctype || 'N/A'}</td>
//                   <td>{item.price?.toFixed(2)}</td>
//                   <td>{item.vid?.companyname}</td>
//                   <td>{item.vid?.liscenceno}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}

//         <Button
//           variant="secondary"
//           className="mt-3"
//           onClick={() => navigate('/vendor/dashboard')}
//         >
//           ← Back to Dashboard
//         </Button>
//       </Card>
//     </Container>
//   );
// };

// export default VendorProductCart;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Container, Button, Card, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VendorProductCart = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingPvid, setEditingPvid] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const navigate = useNavigate();

  const vidFromRedux = useSelector((state) => state.auth?.vid);
  const vid = vidFromRedux || localStorage.getItem("vid");

  const fetchVendorProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/productvendor/getbyvid/${vid}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching vendor products:", err);
      setError("Failed to load your products.");
    }
  };

  useEffect(() => {
    if (!vid) {
      setError('Vendor ID not found. Please login again.');
      return;
    }

    localStorage.setItem("vid", vid);
    fetchVendorProducts();
  }, [vid]);

  const handleEdit = async (pvid) => {
    try {
      const res = await axios.get(`http://localhost:8082/productvendor/getbypvid/${pvid}`);
      setEditPrice(res.data.price);
      setEditingPvid(pvid);
    } catch (err) {
      setError("Failed to fetch product details.");
    }
  };

  const handleUpdate = async (pvid, prodid) => {
  try {
    const price = parseFloat(editPrice);
    if (!price || price <= 0) {
      setError("Enter a valid price.");
      return;
    }

    await axios.put(`http://localhost:8082/productvendor/updateprice?pvid=${pvid}&price=${price}`);
    
    setEditingPvid(null);
    setEditPrice('');
    fetchVendorProducts(); // refresh list
  } catch (err) {
    setError("Failed to update product price.");
    console.error(err);
  }
};


  const handleDelete = async (pvid) => {
    try {
      await axios.delete(`http://localhost:8082/productvendor/delete/${pvid}`);
      fetchVendorProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4">My Products</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {!error && products.length === 0 && <p>Loading products...</p>}

        {products.length > 0 && (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price (₹)</th>
                <th>Company</th>
                <th>License No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.pvid}>
                  <td>{item.prodid?.pname}</td>
                  <td>{item.prodid?.pdescription}</td>
                  <td>{item.prodid?.cid?.cname || 'N/A'}</td>
                  <td>{item.prodid?.cid?.ctype || 'N/A'}</td>
                  <td>
                    {editingPvid === item.pvid ? (
                      <Form.Control
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        min="1"
                      />
                    ) : (
                      item.price?.toFixed(2)
                    )}
                  </td>
                  <td>{item.vid?.companyname}</td>
                  <td>{item.vid?.liscenceno}</td>
                  <td>
                    {editingPvid === item.pvid ? (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleUpdate(item.pvid, item.prodid?.prodid)}
                      >
                        Update
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-2"
                          onClick={() => handleEdit(item.pvid)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(item.pvid)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate('/vendor/dashboard')}
        >
          ← Back to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default VendorProductCart;
