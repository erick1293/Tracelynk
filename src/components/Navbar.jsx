import React from 'react';
import '../stylesheets/navbar.css'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        {/* Dropdown Vehículo */}
        <li className="dropdown">
          <Link to="/AgendarCita" className="dropbtn">Agendar Cita</Link>
          <div className="dropdown-content">
            <Link to="/AgendarCita">Agregar</Link>
            <Link to="/EditarCita">Mostrar/Editar Citas</Link>
            <Link to="/AgendarMantencion">Mantencion</Link>
            <Link to="/test">Test</Link>
          </div>
        </li>
        <li><Link to="/AgregarObjeto">Agregar Objeto</Link></li>
        {/* Dropdown Vehículo */}
        <li className="dropdown">
          <Link to="/Estados" className="dropbtn">Estados</Link>
          <div className="dropdown-content">
            <Link to="/Estados">Agregar</Link>
            <Link to="/EditarEstado">Modificar/Mostar</Link>
          </div>
        </li>
        {/* Dropdown Vehículo */}
        <li className="dropdown">
          <Link to="/AgregarVehiculo" className="dropbtn">Vehículo</Link>
          <div className="dropdown-content">
            <Link to="/AgregarVehiculo">Agregar</Link>
            <Link to="/ModificarVehiculos">Modificar/Mostar</Link>
          </div>
        </li>
        <li className="dropdown">
          <Link to="/AgregarMecanico" className="dropbtn">Mecanicos</Link>
          <div className="dropdown-content">
            <Link to="/AgregarMecanico">Agregar</Link>
            <Link to="/Editar_Mecanico">Modificar/Mostar</Link>
          </div>
        </li>
        {/* Dropdown Polipunto */}
        <li className="dropdown">
          <Link to="/AgregarPolipunto" className="dropbtn">Polipunto</Link>
          <div className="dropdown-content">
            <Link to="/AgregarPoliPunto">Agregar Polígono</Link>
            <Link to="/EditarPoliPunto">Editar</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
