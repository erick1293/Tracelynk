import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost/tracelink/Loguin/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.success) {
                // Inicio de sesión exitoso, establecer estado de autenticación
                setAuth(true);
                // Guardar datos del usuario en localStorage
                localStorage.setItem('userData', JSON.stringify(data.user));
                // Redireccionar al inicio
                navigate('/');
            } else {
                setLoginError(data.message);
            }
        })
        
        .catch(error => {
            console.error('Error:', error);
            setLoginError('Error de red: no se pudo conectar al servidor');
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuario"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            {loginError && <p>{loginError}</p>}
        </div>
    );
};

export default Login;
