import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import StudentDetails from './StudentDetails';
import RoomAllocationRequests from './RoomAllocationRequests';
import { useAuth } from '../auth/AuthContext';
import './adminDashboard.css';
import profileImage from '../images/profile.png';
import behaviour from '../images/behaviour.png';
import civil from '../images/civil.png';
import electricity from '../images/electricity.png';
import router from '../images/behaviour.png';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleRedirect = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div style={{ backgroundColor: '#f0f2f5', height: '100vh' }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 bg-light sidebar vh-100">
                        <nav className="nav flex-column">
                            <NavLink
                                to="/adminDashboard"
                                className="nav-link"
                                end
                                style={{ color: "black" }}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/adminDashboard/studentDetails"
                                className="nav-link"
                                style={{ color: "black" }}
                            >
                                Student Details
                            </NavLink>
                            <NavLink
                                to="/adminDashboard/roomAllocationRequests"
                                className="nav-link"
                                style={{ color: "black" }}
                            >
                                Room Allocation Requests
                            </NavLink>
                            <button
                                className="nav-link btn"
                                onClick={handleLogout}
                                style={{ color: "black", backgroundColor: 'transparent', border: 'none', display: 'flex' }}
                            >
                                Logout
                            </button>
                        </nav>
                    </div>

                    <div className="col-md-10 main-content" style={{ backgroundColor: "#343a40e3" }}>
                        <Routes>
                            <Route path="/" element={<DashboardContent handleRedirect={handleRedirect} />} />
                            <Route path="studentDetails" element={<StudentDetails />} />
                            <Route path="roomAllocationRequests" element={<RoomAllocationRequests />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardContent = ({ handleRedirect }) => {
    const { user } = useAuth();
    const [initialUserDetails, setInitialUserDetails] = useState(null);

    useEffect(() => {
        if (!initialUserDetails) {
            setInitialUserDetails(user);
        }
    }, [user, initialUserDetails]);

    if (!initialUserDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white', marginTop: '20px' }}>Admin Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#212529',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        width: '100%',
                        fontFamily: 'Arial, sans-serif',
                        color: 'white',
                        fontSize: '18px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ fontSize: 'larger' }}>
                        <p><strong>Full Name:</strong> {initialUserDetails.result.fullname}</p>
                        <p><strong>Hostel Name:</strong> {initialUserDetails.result.hostelname}</p>
                        <p><strong>Gender:</strong> {initialUserDetails.result.gender}</p>
                        <p><strong>Phone Number:</strong> {initialUserDetails.result.phonenumber}</p>
                        <p><strong>Email:</strong> {initialUserDetails.result.email}</p>
                        <p><strong>Designation:</strong> Admin</p>
                    </div>
                    <div style={{
                        width: '170px',
                        height: '170px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginRight: '20px',
                        marginLeft: '80px',
                        marginBottom: '50px'
                    }}>
                        <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>

            {/* Raise Issue Buttons */}
            <Container className="raise-issue-container" style={{ marginTop: '20px' }}>
                <Row className="issue-buttons">
                    <Col xs={6} md={3} onClick={() => handleRedirect('https://www.iitrpr.ac.in/')}>
                        <div className="issue-button">
                            <img src={civil} alt="Civil Issue" className="issue-icon" />
                            <Button variant="primary" className="issue-button-text">Civil Issue</Button>
                        </div>
                    </Col>
                    <Col xs={6} md={3} onClick={() => handleRedirect('https://www.iitrpr.ac.in/')}>
                        <div className="issue-button">
                            <img src={behaviour} alt="Behaviour Issue" className="issue-icon" />
                            <Button variant="primary" className="issue-button-text">Behaviour Issue</Button>
                        </div>
                    </Col>
                    <Col xs={6} md={3} onClick={() => handleRedirect('https://www.iitrpr.ac.in/')}>
                        <div className="issue-button">
                            <img src={electricity} alt="Electricity Issue" className="issue-icon" />
                            <Button variant="primary" className="issue-button-text">Electricity</Button>
                        </div>
                    </Col>
                    <Col xs={6} md={3} onClick={() => handleRedirect('https://www.iitrpr.ac.in/')}>
                        <div className="issue-button">
                            <img src={router} alt="IT Issue" className="issue-icon" />
                            <Button variant="primary" className="issue-button-text">IT Team</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminDashboard;
