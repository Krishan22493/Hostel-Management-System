import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../auth/axiosInstance';
import './RoomAllocationRequests.css';

const RoomAllocationRequest = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vacantRooms, setVacantRooms] = useState([]);
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  const [lastAlloted, setLastAlloted] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/get-all-pending-users');
        setRequests(response.data.data);
        setAppliedCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching pending users:', error);
      }
    };

    const fetchVacantRooms = async () => {
      try {
        const response = await axiosInstance.get('/admin/get-vacant-room');
        // Extract room numbers from response
        const roomNumbers = response.data.data.map(room => room.roomno);
        setVacantRooms(roomNumbers);
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

  const filteredRequests = requests.filter(request =>
    request.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAllotRoom = async (requestIndex) => {
    if (vacantRooms.length === 0) {
      alert('No vacant rooms available!');
      return;
    }

    const request = requests[requestIndex];
    if (request.allocated) {
      alert('Room already allocated to this person!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * vacantRooms.length);
    const roomToAllot = vacantRooms[randomIndex];

    try {
      const response = await axiosInstance.post('/admin/room-allot', {
        email: request.email,
        roomno: roomToAllot
      });

      if (response.data.success) {
        setVacantRooms(vacantRooms.filter((_, index) => index !== randomIndex));

        const updatedRequests = requests.filter((_, index) => index !== requestIndex);
        setRequests(updatedRequests);

        setAppliedCount(prev => prev - 1);
        setOccupiedCount(prev => prev + 1);
        setLastAlloted(`${request.fullname} (${roomToAllot})`);
      } else {
        alert('Room allotment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error allotting room:', error);
      alert('An error occurred while allotting the room. Please try again.');
    }
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#343a4000" }}>
      <Row className="mb-4">
        <Col xs={12} md={9}>
          <h2 style={{ fontSize: '28px', color: 'white' }}>Room Allocation Request</h2>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs={12} md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title style={{ fontSize: '18px' }}>Applied</Card.Title>
              <Card.Text className="display-6" style={{ color: "aqua", fontWeight: "500", fontSize: '24px' }}>
                {appliedCount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title style={{ fontSize: '18px' }}>Vacant Rooms</Card.Title>
              <Card.Text className="display-6" style={{ color: "yellow", fontWeight: "500", fontSize: '24px' }}>
                {vacantRooms.length}
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
        <Col xs={12} md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title style={{ fontSize: '18px' }}>Last Alloted Room</Card.Title>
              <Card.Text className="display-6" style={{ color: "#d92599", fontWeight: "500", fontSize: '20px' }}>
                {lastAlloted || 'None'}
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

      {filteredRequests.map((request, index) => (
        <Row key={index} className="mb-3">
          <Col xs={12} md={9}>
            <Card bg="dark" text="white">
              <Card.Body style={{ padding: '5px' }}>
                <Row>
                  <Col xs={4}>
                    <Card.Title className="mb-0" style={{ fontSize: '20px' }}>{request.fullname}</Card.Title>
                  </Col>
                  <Col xs={4}>
                    <Card.Text className="mb-0" style={{ fontSize: '20px' }}>Email: {request.email}</Card.Text>
                  </Col>
                  <Col xs={4} style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    <Button
                      variant="success"
                      style={{ fontSize: '16px', width: "50%", marginLeft: "50%" }}
                      onClick={() => handleAllotRoom(index)}
                    >
                      Allot Room
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default RoomAllocationRequest;
