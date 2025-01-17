import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '@/services/SessionService';
import { PrivateRouteProps } from './interfaces';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    // const isAuthenticated = !!getAccessToken();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/auth/login');
    //     }
    // }, [isAuthenticated, navigate]);

    // return isAuthenticated ? <>{children}</> : null;
    return <>{children}</>
};

export default PrivateRoute;
