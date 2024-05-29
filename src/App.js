import React from 'react';
import { BrowserRouter, Route, Routes , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import AgendarCita from './components/AgendarCita';
import AgregarAuto from './components/AgregarAuto';
import AgregarObjeto from './components/AgregarObjeto';
import Estados from './components/Estados';
import AgregarVehiculo from "./Axios/Agregar_axios"
import ModificarVehiculos from "./Axios/Modificar_vehiculos"


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar/>}/> 
        <Route path='/AgendarCita' element={<AgendarCita/>}/>
        <Route path='/AgregarAuto' element={<AgregarAuto/>}/>
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
