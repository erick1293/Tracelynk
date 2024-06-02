import React from 'react';
import { BrowserRouter, Route, Routes , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import AgendarCita from './components/AgendarCita';
import AgregarObjeto from './components/AgregarObjeto';
import Estados from './components/Estados';
import AgregarVehiculo from "./Axios/Agregar_axios"
import ModificarVehiculos from "./Axios/Modificar_vehiculos"
import Inicio from "./components/Inicio"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/inicio' element={<Inicio/>}/> 
        <Route path='/AgendarCita' element={<AgendarCita/>}/>
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
