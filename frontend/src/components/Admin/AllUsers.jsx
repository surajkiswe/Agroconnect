import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8084/api/admin/getAllUsers')
      .then((res) => {
        const data = res.data;
        if (data && Array.isArray(data.$values)) {
          setUsers(data.$values);
        } else {
          console.error('Invalid user array:', data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      });
  }, []);

  const handleDelete = (uid) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:8084/api/admin/deleteUser?uid=${uid}`)
        .then(() => {
          setUsers(users.filter(user => user.uid !== uid));
        })
        .catch((err) => {
          console.error('Error deleting user:', err);
          setError('Failed to delete user.');
        });
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header><h4>All Users</h4></Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.uid)}
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
            className="btn btn-secondary mb-3"
          >
            ← Back to Dashboard
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AllUsers;
