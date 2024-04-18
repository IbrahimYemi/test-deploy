import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { frontendURIs } from '../config/routes';

const LoginRoutes = () => {
    const auth = !!localStorage.getItem('token');

    return !auth ? <Outlet /> : <Navigate to={frontendURIs.admin} />;
};

export default LoginRoutes;
