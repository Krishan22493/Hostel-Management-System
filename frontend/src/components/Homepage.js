import React from 'react';
import homeImage from '../images/homepage.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {
  return (
    <div style={{backgroundColor:'black'}}>
      <img
        src={homeImage}
        alt="Full Width Banner"
        className="img-fluid"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default Homepage;
