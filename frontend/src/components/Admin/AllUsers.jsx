import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/Admin/getAllUsers')
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
  };

  const toggleUserStatus = (uid, currentStatus) => {
  const newStatus = currentStatus === 1 ? 0 : 1;
  const action = currentStatus === 1 ? 'disable' : 'enable';

  if (window.confirm(`Are you sure you want to ${action} this user?`)) {
    axios.put(`http://localhost:8080/api/Admin/updateUserStatus/${uid}`, { newStatus })
      .then(() => {
        setUsers(users.map(user =>
          user.uid === uid ? { ...user, status: newStatus } : user
        ));
      })
      .catch((err) => {
        console.error(`Error toggling user status:`, err);
        setError(`Failed to ${action} user.`);
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.username}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.roleName || user.role}</td>
                  <td>{user.status === 1 ? 'Active' : 'Disabled'}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.status === 1 ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => toggleUserStatus(user.uid, user.status)}
                    >
                      {user.status === 1 ? 'Disable' : 'Enable'}
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
