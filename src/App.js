import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AgendarCita from './Axios/AgendarCita';
import AgregarObjeto from './components/AgregarObjeto';
import Estados from './components/Estados';
import AgregarVehiculo from "./Axios/Agregar_axios";
import ModificarVehiculos from "./Axios/Modificar_vehiculos";
import Inicio from "./components/Inicio";
import Mantencion from "./Axios/AgregarMantencion";
import Taller_Mecanico from "./Axios/Taller_Mecanico";
import Editar_mecanico from "./Axios/Editar_mecanico";
import EditarEstado from './Axios/EditarEstado';
import TestFiltrado from './Axios/Filtrados';
import AgregarPoliPunto from './Axios/AgregarPolipunto';
import EditarPoliPunto from './Axios/EditarPoliPunto';
import EditarCita from './Axios/EditarCita';
import Login from './components/Login';
import Register from './components/Register';
import Alerta_Vehiculos from './Axios/Alerta_Vehiculos';
import { isAuthenticated, getUserData, removeUserData, getUserRole } from './components/auth';
import PrivateRoute from './components/PrivateRoute';
import AccessDenied from './Axios/access-denied';
import Navbar from './components/Navbar';  
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

function AppContent() {
    const [auth, setAuth] = useState(isAuthenticated());
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            const user = getUserData();
            setUserData(user);
        }
    }, [auth]);

    const handleLogout = () => {
        removeUserData();
        setAuth(false);
        navigate('/login');
    };

    return (
        <>
            <Navbar userData={userData} handleLogout={handleLogout} /> {/* Pasa userData a Navbar */}
            <Routes>
                <Route path="/" element={<Inicio userData={userData} handleLogout={handleLogout} />} />
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path='/AgendarCita' element={<PrivateRoute element={AgendarCita} auth={auth} rolesAllowed={[1, 2]} />} />
                <Route path='/AgendarMantencion' element={<PrivateRoute element={Mantencion} auth={auth} rolesAllowed={[1, 2]} />} />
                <Route path="/test" element={<PrivateRoute element={TestFiltrado} auth={auth} rolesAllowed={[1]} />} />
                <Route path="/register" element={<PrivateRoute element={Register} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/AgregarObjeto' element={<PrivateRoute element={AgregarObjeto} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/Estados' element={<PrivateRoute element={Estados} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/AgregarVehiculo' element={<PrivateRoute element={AgregarVehiculo} auth={auth} rolesAllowed={[1, 2]} />} />
                <Route path='/ModificarVehiculos' element={<PrivateRoute element={ModificarVehiculos} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/Taller_Mecanico' element={<PrivateRoute element={Taller_Mecanico} auth={auth} rolesAllowed={[1, 2]} />} />
                <Route path='/Editar_Mecanico' element={<PrivateRoute element={Editar_mecanico} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/EditarEstado' element={<PrivateRoute element={EditarEstado} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/AgregarPoliPunto' element={<PrivateRoute element={AgregarPoliPunto} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/EditarPoliPunto' element={<PrivateRoute element={EditarPoliPunto} auth={auth} rolesAllowed={[1]} />} />
                <Route path='/Editarcita' element={<PrivateRoute element={EditarCita} auth={auth} rolesAllowed={[1, 2]} />} />
                <Route path='/Alerta_Vehiculos' element={<PrivateRoute element={Alerta_Vehiculos} auth={auth} rolesAllowed={[1, 2]} />} />
            </Routes>
        </>
    );
}

export default App;
