import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'; // Import the custom CSS

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    idcard: null,
    hostelname: '',
    gender: '',
    email: '',
    password: '',
    designation: '',
    phonenumber: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if ID card is required
    if (formData.designation === 'Student' && !formData.idcard) {
      setMessage('ID card is required for Students.');
      return;
    }

    const data = new FormData();
    data.append('fullname', formData.fullname);
    data.append('idcard', formData.idcard);
    data.append('hostelname', formData.hostelname);
    data.append('gender', formData.gender);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('designation', formData.designation);
    data.append('phonenumber', formData.phonenumber);

    // Determine API URL based on designation
    const apiUrl = formData.designation === 'Admin' 
      ? 'http://localhost:8000/api/v1/admin/register' 
      : 'http://localhost:8000/api/v1/users/register';

    try {
      const response = await axios.post(apiUrl, data);
      if (response.status === 200) {
        setMessage('Registration successful! You can now log in.');
      } else {
        setMessage('Registration failed. Please try again.');
      }
      console.log(response);
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="Register-background">
      <Container className="Register-container">
        <h2 className="text-center my-4">Registration</h2>
        {message && <Alert variant="info" className="text-center">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formfullname">
            <Form.Label column sm={3}>Full Name</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formidcard" className="mt-3">
            <Form.Label column sm={3}>ID Card</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                name="idcard"
                onChange={handleChange}
                // Only show the required attribute if designation is Student
                required={formData.designation === 'Student'}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formhostelname" className="mt-3">
            <Form.Label column sm={3}>Hostel Name</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="hostelname"
                value={formData.hostelname}
                onChange={handleChange}
                required
              >
                <option value="">Select hostel</option>
                <option value="Chenab">Chenab</option>
                <option value="Ravi">Ravi</option>
                <option value="Satluj">Satluj</option>
                <option value="Beas">Beas</option>
                <option value="Brahmputra">Brahmputra</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formdesignation" className="mt-3">
            <Form.Label column sm={3}>Designation</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select designation</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGender" className="mt-3">
            <Form.Label column sm={3}>Gender</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="gender"
                placeholder="Enter gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEmail" className="mt-3">
            <Form.Label column sm={3}>Email</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formphoneno" className="mt-3">
            <Form.Label column sm={3}>Phone Number</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="tel"
                name="phonenumber"
                placeholder="Enter phone number"
                value={formData.phonenumber}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPassword" className="mt-3">
            <Form.Label column sm={3}>Password</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
