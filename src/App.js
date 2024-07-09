import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import AgendarCita from './Axios/AgendarCita';
import AgregarObjeto from './components/AgregarObjeto';
import Estados from './components/Estados';
import AgregarVehiculo from "./Axios/Agregar_axios";
import ModificarVehiculos from "./Axios/Modificar_vehiculos";
import Inicio from "./components/Inicio";
import Mantencion from "./Axios/AgregarMantencion";
import AgregarMecanico from './Axios/Agregar_Mecanico';
import Editar_mecanico from "./Axios/Editar_mecanico";
import EditarEstado from './Axios/EditarEstado';
import TestFiltrado from './Axios/Filtrados';
import AgregarPoliPunto from './Axios/AgregarPolipunto';
import EditarPoliPunto from './Axios/EditarPoliPunto';
import EditarCita from './Axios/EditarCita';
import Login from './Axios/Login';

function PrivateRoute({ children, auth, role }) {
  if (!auth) {
    return <Navigate to="/login" />;
  }
  if (role && auth.role !== role) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const fetchAuth = async () => {
      try {
        const response = await axios.get('http://localhost/Tracelink/Loguin/checkAuth.php');
        if (response.data.authenticated) {
          setAuth(response.data.user);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
    fetchAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/AgendarCita" element={<PrivateRoute auth={auth} role="admin"><AgendarCita /></PrivateRoute>} />
          <Route path="/AgendarMantencion" element={<PrivateRoute auth={auth} role="admin"><Mantencion /></PrivateRoute>} />
          <Route path="/AgregarObjeto" element={<PrivateRoute auth={auth} role="admin"><AgregarObjeto /></PrivateRoute>} />
          <Route path="/Estados" element={<PrivateRoute auth={auth} role="admin"><Estados /></PrivateRoute>} />
          <Route path="/AgregarVehiculo" element={<PrivateRoute auth={auth} role="admin"><AgregarVehiculo /></PrivateRoute>} />
          <Route path="/ModificarVehiculos" element={<PrivateRoute auth={auth} role="admin"><ModificarVehiculos /></PrivateRoute>} />
          <Route path="/AgregarMecanico" element={<PrivateRoute auth={auth} role="admin"><AgregarMecanico /></PrivateRoute>} />
          <Route path="/Editar_Mecanico" element={<PrivateRoute auth={auth} role="admin"><Editar_mecanico /></PrivateRoute>} />
          <Route path="/EditarEstado" element={<PrivateRoute auth={auth} role="admin"><EditarEstado /></PrivateRoute>} />
          <Route path="/test" element={<PrivateRoute auth={auth} role="admin"><TestFiltrado /></PrivateRoute>} />
          <Route path="/AgregarPoliPunto" element={<PrivateRoute auth={auth} role="admin"><AgregarPoliPunto /></PrivateRoute>} />
          <Route path="/EditarPoliPunto" element={<PrivateRoute auth={auth} role="admin"><EditarPoliPunto /></PrivateRoute>} />
          <Route path="/Editarcita" element={<PrivateRoute auth={auth} role="admin"><EditarCita /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
