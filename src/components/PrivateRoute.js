import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, auth, rolesAllowed, ...rest }) => {
    // Verificar si el usuario está autenticado
    if (!auth.authenticated) {
        return <Navigate to="/login" />;
    }

    // Verificar si el rol del usuario tiene permiso para acceder a la ruta
    if (!rolesAllowed.includes(auth.role)) {
        // Si el rol del usuario no está en rolesAllowed, redirigir a una página de acceso denegado u otra ruta según necesites
        return <Navigate to="/access-denied" />;
    }

    // Permitir el acceso a la ruta si pasa todas las verificaciones
    return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
