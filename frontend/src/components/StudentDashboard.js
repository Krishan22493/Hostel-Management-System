import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate
import UpdateStudentProfile from './UpdateStudentProfile'; // Renamed to PascalCase
import RaiseIssue from './RaiseIssue'; // Renamed to PascalCase
import { useAuth } from '../auth/AuthContext'; // Import the useAuth hook
import './studentDashboard.css';

const StudentDashboard = () => {
    const { logout } = useAuth(); // Get the logout function from context
    const navigate = useNavigate(); // Get the navigate function

    const handleLogout = () => {
        logout(); // Call the logout function to remove the token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div style={{ backgroundColor: '#f0f2f5', height: '100vh' }}> {/* Background color for the body */}
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-2 bg-light sidebar vh-100">
                        <nav className="nav flex-column">
                            <NavLink
                                to="/studentDashboard"
                                className="nav-link"
                                end
                                style={{ color: "black" }}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/studentDashboard/updateStudentProfile"
                                className="nav-link"
                                style={{ color: "black" }}
                            >
                                Update Details
                            </NavLink>
                            <NavLink
                                to="/studentDashboard/raiseIssue"
                                className="nav-link"
                                style={{ color: "black" }}
                            >
                                Raise Issue
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

                    {/* Main content area */}
                    <div className="col-md-10 main-content" style={{ backgroundColor: "#343a40e3" }}>
                        <Routes>
                            <Route path="/" element={<DashboardContent />} />
                            <Route path="updateStudentProfile" element={<UpdateStudentProfile />} /> {/* Updated component name */}
                            <Route path="raiseIssue" element={<RaiseIssue />} /> {/* Updated component name */}
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Default Dashboard Content (for the root path /studentDashboard)
const DashboardContent = () => {
    const { user } = useAuth(); // Get the user from global context
    const [initialUserDetails, setInitialUserDetails] = useState(null);

    useEffect(() => {
        // Store the user details only on the first mount
        if (!initialUserDetails) {
            setInitialUserDetails(user);
        }
    }, [user, initialUserDetails]);

    if (!initialUserDetails) {
        return <div>Loading...</div>; // Show a loading state if the user details are not yet loaded
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white', marginTop: '20px' }}>Student Dashboard</h2>
            <div style={{ padding: '20px' }}>
                <div className="row">
                    {/* Details Column */}
                    <div className="col-12">
                        <div
                            style={{
                                backgroundColor: '#212529',
                                borderRadius: '8px',
                                padding: '20px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                fontFamily: 'Arial, sans-serif',
                                color: 'white',
                                fontSize: '18px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <div className="row">
                                <div className="col-md-6" style={{ fontSize:'xx-large' }}>
                                    <p><strong>Full Name:</strong> {initialUserDetails.result.fullname}</p>
                                    <p><strong>Email:</strong> {initialUserDetails.result.email}</p>
                                    <p><strong>Hostel Name:</strong> {initialUserDetails.result.hostelname}</p>
                                    <p><strong>Gender:</strong> {initialUserDetails.result.gender}</p>
                                    <p><strong>Phone Number:</strong> {initialUserDetails.result.phonenumber}</p>
                                    <p><strong>Room No:</strong> {initialUserDetails.result.roomno ? initialUserDetails.result.roomno : "Not Assigned yet"}</p>
                                </div>

                                {/* Image Column */}
                                <div className="col-md-6" style={{ textAlign: 'center' }}>
                                    <h4 style={{fontWeight:'bold'}}>ID Details</h4>
                                    <div style={{ 
                                        width: '100%', 
                                        height: 'auto', 
                                        padding: '5px',
                                        display: 'inline-block',
                                    }}>
                                        <img src={initialUserDetails.result.idcard} alt="Profile" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
