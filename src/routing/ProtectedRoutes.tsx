import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

// Function to intercept Axios responses
const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        (error) => {
            // Handle error responses
            const { config, response, code } = error;

            captureException(error, {
                tags: {
                    url: config?.url,
                    method: config?.method
                },
                extra: {
                    body: config?.data,
                    params: config?.params,
                    data: response?.data,
                    code: code
                }
            });

            if (error.response && error.response.status === 401) {
                // Token is expired or invalid, remove it from local storage
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('token_registered');
            }

            return Promise.reject(error);
        }
    );
};

// Call the setupAxiosInterceptors function to set up interceptors
setupAxiosInterceptors();

const ProtectedRoute: React.FC = () => {
    const tokenRegisteredString = localStorage.getItem('token_registered');
    const mainToken = localStorage.getItem('token');
    const tokenRegistered = tokenRegisteredString
        ? parseInt(tokenRegisteredString)
        : null;

    // Check if token is present and registered within the last 72 hours
    const auth =
        !!mainToken &&
        tokenRegistered &&
        Date.now() - tokenRegistered < 72 * 60 * 60 * 1000;

    // If token is not valid, remove it from local storage
    if (!auth || !mainToken) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('token_registered');
    }

    return auth ? (
            <Outlet />
    ) : (
        <Navigate to='/404' />
    );
};

export default ProtectedRoute;
function captureException(error, arg1) {
    throw new Error('Function not implemented.');
}

