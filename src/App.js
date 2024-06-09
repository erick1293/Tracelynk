import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AgendarCita from './components/AgendarCita';
import AgregarObjeto from './components/AgregarObjeto';
import Estados from './components/Estados';
import AgregarVehiculo from "./Axios/Agregar_axios"
import ModificarVehiculos from "./Axios/Modificar_vehiculos"
import Inicio from "./components/Inicio"
import Mantencion from "./Axios/Agregarmantenciones" 
import AgendarCitas from "./Axios/CrearCita"
import Mapa from "./components/Mapa"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/>}/> 
        <Route path='/AgendarCita' element={<AgendarCita/>}/>

        <Route path='/AgendarCitas' element={<AgendarCitas/>}/>
        <Route path='/AgendarMantencion' element={<Mantencion/>}/>
        <Route path='/AgregarObjeto' element={<AgregarObjeto/>}/>
        <Route path='/Estados' element={<Estados/>}/> 
        <Route path='/AgregarVehiculo' element={<AgregarVehiculo/>}/> 
        <Route path='/ModificarVehiculos' element={<ModificarVehiculos/>}/> 
      </Routes>     
      </BrowserRouter>
    </>
  );
}

export default App;