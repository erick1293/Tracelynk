import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AccessDenied = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Acceso Denegado</h1>
            <p>Conéctese con un administrador para obtener acceso.</p>
            <Button variant="primary" onClick={handleLoginRedirect}>
                Ir a Inicio de Sesión
            </Button>
        </div>
    );
};

export default AccessDenied;
