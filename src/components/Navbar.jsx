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
            <Link to="/test">Filtro Mantencion/Citas</Link>
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
            <Link to="/Alerta_Vehiculos">Alertas Vehiculos</Link>
          </div>
        </li>
        <li className="dropdown">
          <Link to="/Taller_Mecanico" className="dropbtn">Taller Mecanico</Link>
          <div className="dropdown-content">
            <Link to="/Taller_Mecanico">Agregar</Link>
         {// <Link to="/Editar_Mecanico">Modificar/Mostar</Link>
}</div>
         
        </li>
        {/* Dropdown Polipunto */}
        <li className="dropdown">
          <Link to="/AgregarPolipunto" className="dropbtn">Polipunto</Link>
          <div className="dropdown-content">
            <Link to="/AgregarPoliPunto">Agregar Polígono</Link>
            <Link to="/EditarPoliPunto">Editar</Link>
          </div>
        </li>
        {/* Dropdown Usuarios */}
        <li className="dropdown login-dropdown">
          <Link to="/Login" className="dropbtn">Login</Link>
          <div className="dropdown-content">
            <Link to="/Login">Login</Link>
            <Link to="/Register">Registrar</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
