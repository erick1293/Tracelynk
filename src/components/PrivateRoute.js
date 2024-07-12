import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRoleId } from './auth';

const PrivateRoute = ({ element: Element, auth, rolesAllowed }) => {
    if (!auth) {
        return <Navigate to="/login" />;
    }

    const userRole = getUserRoleId();
    if (!rolesAllowed.includes(userRole)) {
        return <Navigate to="/access-denied" />;
    }

    return <Element />;
};

export default PrivateRoute;

