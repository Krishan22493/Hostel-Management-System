import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check token in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        console.log("Raw token received:", token); // Log the raw token
    
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
    
        console.log("Decoded token:", decoded); // Log the decoded token
    
        setUser(decoded);
        setIsAuthenticated(true);
    
        console.log("User state updated after login:", decoded); // Log after state update
    };
    

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
