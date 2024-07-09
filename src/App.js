import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AgendarCita from './Axios/AgendarCita';
import AgregarObjeto from './components/AgregarObjeto';
import Estados from './components/Estados';
import AgregarVehiculo from "./Axios/Agregar_axios";
import ModificarVehiculos from "./Axios/Modificar_vehiculos";
import Inicio from "./components/Inicio";
import Mantencion from "./Axios/AgregarMantencion" ;
import AgregarMecanico from './Axios/Agregar_Mecanico';
import Editar_mecanico from "./Axios/Editar_mecanico"
import EditarEstado from './Axios/EditarEstado';
import TestFiltrado from './Axios/Filtrados';
import AgregarPoliPunto from './Axios/AgregarPolipunto';
import EditarPoliPunto from './Axios/EditarPoliPunto';
import EditarCita from './Axios/EditarCita';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/>}/> 
        <Route path='/AgendarCita' element={<AgendarCita/>}/>
        <Route path='/AgendarMantencion' element={<Mantencion/>}/>
        <Route path='/AgregarObjeto' element={<AgregarObjeto/>}/>
        <Route path='/Estados' element={<Estados/>}/> 
        <Route path='/AgregarVehiculo' element={<AgregarVehiculo/>}/> 
        <Route path='/ModificarVehiculos' element={<ModificarVehiculos/>}/> 
        <Route path='/AgregarMecanico' element={<AgregarMecanico/>}/> 
        <Route path='/Editar_Mecanico' element={<Editar_mecanico/>}/> 
        <Route path='/EditarEstado' element={<EditarEstado/>}/> 
        <Route path='/test' element={<TestFiltrado/>}/>
        <Route path='/AgregarPoliPunto' element={<AgregarPoliPunto/>}/>
        <Route path='/EditarPoliPunto' element={<EditarPoliPunto/>}/> 
        <Route path='/Editarcita' element={<EditarCita/>}/> 
      </Routes>     
      </BrowserRouter>
    </>
  );
}

export default App;