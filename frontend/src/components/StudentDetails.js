import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../auth/axiosInstance';
import './StudentDetails.css';

const StudentDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vacantRooms, setVacantRooms] = useState(0);
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/get-users');
        setUsers(response.data.data);
        setTotalCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchVacantRooms = async () => {
      try {
        const response = await axiosInstance.get('/admin/get-vacant-room');
        // Extract room numbers count from response
        setVacantRooms(response.data.data.length);
      } catch (error) {
        console.error('Error fetching vacant rooms:', error);
      }
    };

    const fetchOccupiedRoomCount = async () => {
      try {
        const response = await axiosInstance.get('/admin/get-occupied-room');
        // Set the count of occupied rooms
        setOccupiedCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching occupied room count:', error);
      }
    };

    fetchPendingUsers();
    fetchVacantRooms();
    fetchOccupiedRoomCount();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#343a4000" }}>
      <Row className="mb-4">
        <Col xs={12} md={9}>
          <h2 style={{ fontSize: '28px', color: 'white' }}>Student Details</h2>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs={12} md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title style={{ fontSize: '18px' }}>Total</Card.Title>
              <Card.Text className="display-6" style={{ color: "aqua", fontWeight: "500", fontSize: '24px' }}>
                {totalCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title style={{ fontSize: '18px' }}>Vacant Rooms</Card.Title>
              <Card.Text className="display-6" style={{ color: "yellow", fontWeight: "500", fontSize: '24px' }}>
                {vacantRooms}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title style={{ fontSize: '18px' }}>Occupied Rooms</Card.Title>
              <Card.Text className="display-6" style={{ color: "green", fontWeight: "500", fontSize: '24px' }}>
                {occupiedCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4 mt-4">
        <Col xs={12} md={3}>
          <InputGroup>
            <InputGroup.Text style={{ backgroundColor: '#212529', border: 'none' }}>
              <FontAwesomeIcon icon={faSearch} style={{ color: 'white' }} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search here ...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="custom-form-control"
              style={{ fontSize: '16px', backgroundColor: '#212529', color: 'white', border: 'none' }}
            />
          </InputGroup>
        </Col>
      </Row>

      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, index) => (
          <Row key={index} className="mb-3">
            <Col xs={12} md={9}>
              <Card bg="dark" text="white">
                <Card.Body style={{ padding: '5px' }}>
                  <Row>
                    <Col xs={4}>
                      <Card.Title className="mb-0" style={{ fontSize: '20px' }}>{user.fullname}</Card.Title>
                    </Col>
                    <Col xs={4}>
                      <Card.Text className="mb-0" style={{ fontSize: '20px' }}>Email: {user.email}</Card.Text>
                    </Col>
                    <Col xs={4}>
                      <Card.Text className="mb-0" style={{ fontSize: '20px' }}>Room No : {user.roomno ? user.roomno : ' Not assigned'}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      ) : (
        <Row className="mb-3">
          <Col xs={12}>
            <Card bg="dark" text="white">
              <Card.Body>
                <Card.Text style={{ fontSize: '20px', textAlign: 'center' }}>No users found</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default StudentDetails;
