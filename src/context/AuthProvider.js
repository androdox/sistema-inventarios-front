import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const authenticate = async () => {
        try {
            const response = await axios.post('https://api.example.com/oauth2/token', {
                grant_type: 'client_credentials',
                client_id: 'your-client-id',
                client_secret: 'your-client-secret',
            });
            setToken(response.data.access_token);
        } catch (error) {
            console.error('Error al obtener el token:', error);
        }
    };

    useEffect(() => {
        authenticate();
    }, []);

    return (
        <AuthContext.Provider value={{ token, authenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

