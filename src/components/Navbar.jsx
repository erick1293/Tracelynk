import React from 'react';
import '../stylesheets/navbar.css'; 

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
         {/* Dropdown Vehículo */}
         <li className="dropdown">
        <a href="/AgendarCita" className="dropbtn">Agendar Cita</a>
        <div className="dropdown-content">
            <a href="/AgendarCita">Agregar</a>
            <a href="/AgendarCitas">Mostrar Citas</a>
            <a href="/AgendarMantencion">Mantencion</a>
          </div></li>
        <li><a href="/AgregarObjeto">Agregar Objeto</a></li>
         {/* Dropdown Vehículo */}
         <li className="dropdown">
          <a href="/Estados" className="dropbtn">Estados</a>
            <div className="dropdown-content">
            <a href="/Estados">Agregar</a>
            <a href="/EditarEstado">Modificar/Mostar</a>
          </div>
        </li>
        {/* Dropdown Vehículo */}
        <li className="dropdown">
          <a href="/AgregarVehiculo" className="dropbtn">Vehículo</a>
            <div className="dropdown-content">
            <a href="/AgregarVehiculo">Agregar</a>
            <a href="/ModificarVehiculos">Modificar/Mostar</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="/AgregarMecanico" className="dropbtn">Mecanicos</a>
            <div className="dropdown-content">
            <a href="/AgregarMecanico">Agregar</a>
            <a href="/Editar_Mecanico">Modificar/Mostar</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

