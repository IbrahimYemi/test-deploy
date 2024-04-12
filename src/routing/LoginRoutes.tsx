import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const LoginRoutes = () => {
    const auth = !!localStorage.getItem('token');

    return !auth ? <Outlet /> : <Navigate to='/institutions/home' />;
};

export default LoginRoutes;
