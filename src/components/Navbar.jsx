import React from 'react';
import '../stylesheets/navbar.css'; // Importa el archivo CSS de estilos

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/AgendarCita">Agendar Cita</a></li>
        <li><a href="/AgregarAuto">Agregar Auto</a></li>
        <li><a href="/AgregarObjeto">Agregar Objeto</a></li>
        <li><a href="/Estados">Estado</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

