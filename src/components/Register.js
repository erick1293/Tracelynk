import React, { useState } from 'react';
import axios from 'axios';
import Navbar  from './Navbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role_id, setRole_id] = useState('1'); // Establece un valor por defecto para role_id
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos a enviar:', { username, password, role_id });

    try {
      const response = await axios.post('http://localhost/Tracelink/Loguin/register.php', {
        username,
        password,
        role_id,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Respuesta del servidor:', response.data);
      if (response.data.success) {
        setAlertMessage('Usuario registrado correctamente.');
      } else {
        setAlertMessage('Error al registrar usuario.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setAlertMessage('Error al conectar con el servidor.');
    }
  };

  const handleRoleChange = (e) => {
    setRole_id(e.target.value); // Actualiza role_id cuando cambia la selección del select
  };

  return (
    <div>
      <h2>Register</h2>
      {alertMessage && <div className={alertMessage.includes('Error') ? 'error' : 'success'}>{alertMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role_id} onChange={handleRoleChange}>
          <option value="1">Administrador</option>
          <option value="2">Usuario</option>
          <option value="3">Secretario</option>
          {/* Agrega otros roles según tu necesidad */}
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
