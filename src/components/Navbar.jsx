import React from 'react';
import '../stylesheets/navbar.css'; // Importa el archivo CSS de estilos

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/AgendarCita">Agendar Cita</a></li>
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

