import React from 'react';
import '../stylesheets/navbar.css'; // Importa el archivo CSS de estilos

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
        <li><a href="/Estados">Estado</a></li>
        {/* Dropdown Vehículo */}
        <li className="dropdown">
          <a href="/AgregarVehiculo" className="dropbtn">Vehículo</a>
            <div className="dropdown-content">
            <a href="/AgregarVehiculo">Agregar</a>
            <a href="/ModificarVehiculos">Modificar</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

