import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const PrivateRoutes = ({ children }) => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    if (!currentUser) {
        return <Navigate to='/admin/login' />
    }
    return children;
}

export default PrivateRoutes
