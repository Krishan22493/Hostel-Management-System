import React, { useState } from 'react';
import axiosInstance from '../auth/axiosInstance'; // Adjust the path if necessary

const UpdateStudentProfile = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    fatherName: '',
    dob: '',
    phonenumber: '',
    gender: '',
    email: '',
    idNumber: '',
    department: '',
    issuedDate: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      fullname: formData.fullname,
      fatherName: formData.fatherName,
      dob: formData.dob,
      phonenumber: formData.phonenumber,
      gender: formData.gender,
      email: formData.email,
      idNumber: formData.idNumber,
      department: formData.department,
      issuedDate: formData.issuedDate,
      expiryDate: formData.expiryDate,
    };

    try {
      const response = await axiosInstance.patch('/users/update', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Details Updated');
      }
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };

  // Inline styles
  const containerStyle = {
    backgroundColor: '#343a4000',
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
  };

  const formSectionStyle = {
    marginBottom: '20px',
  };

  const sectionTitleStyle = {
    marginBottom: '15px',
    fontSize: '1.5rem',
    color: 'white',
  };

  const formLabelStyle = {
    fontWeight: 'bold',
    color: 'white',
  };

  const formControlStyle = {
    backgroundColor: '#2c2c2c',
    marginLeft:'5px',
    border: '1px solid #555',
    color: 'white',
  };


  const formActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const btnStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
  };

  const btnSecondaryStyle = {
    ...btnStyle,
    backgroundColor: '#6c757d',
    border: 'none',
  };

  const btnPrimaryStyle = {
    ...btnStyle,
    backgroundColor: '#17a2b8',
    border: 'none',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <div style={formSectionStyle}>
          <h4 style={sectionTitleStyle}>Personal Details</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <label style={formLabelStyle}>Name of Student</label>
              <input
                type="text"
                name="fullname"
                style={formControlStyle}
                placeholder="Name of Student"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label style={formLabelStyle}>Father's Name</label>
              <input
                type="text"
                name="fatherName"
                style={formControlStyle}
                placeholder="Father's Name"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label style={formLabelStyle}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                style={formControlStyle}
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label style={formLabelStyle}>Contact Number</label>
              <input
                type="text"
                name="phonenumber"
                style={formControlStyle}
                placeholder="Contact Number"
                value={formData.phonenumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label style={formLabelStyle}>Gender</label>
              <input
                type="text"
                name="gender"
                style={formControlStyle}
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label style={formLabelStyle}>Institute Email</label>
              <input
                type="email"
                name="email"
                style={formControlStyle}
                placeholder="Institute Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div style={formSectionStyle}>
          <h4 style={sectionTitleStyle}>Identity Details</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <label style={formLabelStyle}>Enter ID Number</label>
              <input
                type="text"
                name="idNumber"
                style={formControlStyle}
                placeholder="Enter ID Number"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label style={formLabelStyle}>Enter the Department</label>
              <input
                type="text"
                name="department"
                style={formControlStyle}
                placeholder="Enter the Department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label style={formLabelStyle}>ID Card Issued Date</label>
              <input
                type="date"
                name="issuedDate"
                style={formControlStyle}
                value={formData.issuedDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label style={formLabelStyle}>ID Card Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                style={formControlStyle}
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div style={formActionsStyle}>
          <button type="button" style={btnSecondaryStyle}>Back</button>
          <button type="submit" style={btnPrimaryStyle}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentProfile;
