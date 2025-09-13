import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasRedirected = localStorage.getItem('hasRedirectedContact');

    // If the user has not been redirected before
    if (!hasRedirected) {
      // Set the flag in localStorage to indicate redirection has happened
      localStorage.setItem('hasRedirectedContact', 'true');

      // Redirect to the external page
      window.location.href = 'https://www.iitrpr.ac.in/student-affairs/hostel.php';
    } else {
      // If redirected before, navigate to the home page
      localStorage.removeItem('hasRedirectedContact');
      navigate('/');

    }

    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 1000); 
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>Redirecting...</div> 
  );
};

export default Contact;


