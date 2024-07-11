import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
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
import { isAuthenticated, getUserData, removeUserData, getUserRole }from './components/auth'; 
function App() {
    const [auth, setAuth] = useState(isAuthenticated());  // Estado de autenticación inicial
    const [userData, setUserData] = useState(null);      // Estado para almacenar datos del usuario

    useEffect(() => {
        // Obtener y establecer datos del usuario al cargar la aplicación
        if (auth) {
            const user = getUserData();
            setUserData(user);
        }
    }, [auth]);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar datos del usuario del localStorage usando removeUserData
    removeUserData();
    // Actualizar estado de autenticación a falso
    setAuth(false);
};

    return (
        <>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Inicio userData={userData} handleLogout={handleLogout}  />} />
                    <Route path='/AgendarCita' element={<AgendarCita />} />
                    <Route path='/AgendarMantencion' element={<Mantencion />} />
                    <Route path='/AgregarObjeto' element={<AgregarObjeto />} />
                    <Route path='/Estados' element={<Estados />} />
                    <Route path='/AgregarVehiculo' element={<AgregarVehiculo />} />
                    <Route path='/ModificarVehiculos' element={<ModificarVehiculos />} />
                    <Route path='/Taller_Mecanico' element={<Taller_Mecanico />} />
                    <Route path='/Editar_Mecanico' element={<Editar_mecanico />} />
                    <Route path='/EditarEstado' element={<EditarEstado />} />
                    <Route path='/test' element={<TestFiltrado />} />
                    <Route path='/AgregarPoliPunto' element={<AgregarPoliPunto />} />
                    <Route path='/EditarPoliPunto' element={<EditarPoliPunto />} />
                    <Route path='/Editarcita' element={<EditarCita />} />
                    <Route path="/login" element={<Login setAuth={setAuth} />} />
                    <Route path='/register' element={<Register />} />  
                    <Route path='/Alerta_Vehiculos' element={<Alerta_Vehiculos />} />  

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
