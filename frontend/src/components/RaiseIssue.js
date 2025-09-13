import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './RaiseIssue.css'; // Import a custom CSS file for styling
import behaviour from '../images/behaviour.png'
import civil from '../images/civil.png'
import electricity from '../images/electricity.png'
import router from '../images/behaviour.png'

const RaiseIssue = () => {

  const handleRedirect = (url) => {
    window.open(url, '_blank'); // This will open the link in a new tab
  };

  return (
    <Container className="raise-issue-container">
      <h2>Raise an Issue</h2>
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
  );
};

export default RaiseIssue;
