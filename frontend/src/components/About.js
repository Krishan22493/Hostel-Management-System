import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasRedirected = localStorage.getItem('hasRedirectedAbout');

    // If the user has not been redirected before
    if (!hasRedirected) {
      // Set the flag in localStorage to indicate redirection has happened
      localStorage.setItem('hasRedirectedAbout', 'true');

      // Redirect to the external page
      window.location.href = 'https://www.iitrpr.ac.in/about-iit-ropar';
    } else {
      // If redirected before, navigate to the home page
      localStorage.removeItem('hasRedirectedAbout');
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

export default About;
