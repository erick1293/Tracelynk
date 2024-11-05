import React from 'react';
import '../stylesheets/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../stylesheets/imagen.png';

function Navbar({ userData, handleLogout }) {
  return (
    <nav>
      <ul className="navbar-list">
      <li>
          <Link to="/">
            <img src={logo} className="navbar-logo" alt="Logo" />
          </Link>
        </li>

        <li><Link to="/">Inicio</Link></li>

        {userData && (userData.role_id === 1 || userData.role_id === 3) && (
          <>
            <li className="dropdown">
              <Link to="/Estados" className="dropbtn">Estado Vehículos</Link>
              <div className="dropdown-content">
                <Link to="/Estados">Estado Vehículo</Link>
                <Link to="/EditarEstado">Modificar/Mostrar</Link>
              </div>
            </li>


            {userData && (userData.role_id === 1 || userData.role_id === 3) && (
          <li className="dropdown">
            <Link to="/AgendarCita" className="dropbtn">Agendar Cita</Link>
            <div className="dropdown-content">
              <Link to="/AgendarCita">Agregar</Link>
              <Link to="/EditarCita">Mostrar/Editar Citas</Link>
              <Link to="/AgendarMantencion">Mantencion</Link>
              <Link to="/test">Filtro Mantencion/Citas</Link>
            </div>
          </li>
        )}

        {userData && (userData.role_id === 2) && (
          <li className="dropdown">
            <Link to="/EditarCita" className="dropbtn">Mostrar/Editar Citas</Link>
            <div className="dropdown-content">
              <Link to="/EditarCita">Mostrar Citas</Link>
              <Link to="/mostrar_mante">Ver Mantencion</Link>
            </div>
          </li>
        )}

            <li className="dropdown">
              <Link to="/AgregarVehiculo" className="dropbtn">Vehículo</Link>
              <div className="dropdown-content">
                <Link to="/AgregarVehiculo">Agregar</Link>
                <Link to="/ModificarVehiculos">Modificar/Mostrar</Link>
                <Link to="/Alerta_Vehiculos">Alertas Vehículos</Link>
              </div>
            </li>

            <li className="dropdown">
              <Link to="/Taller_Mecanico" className="dropbtn">Taller Mecánico</Link>
              <div className="dropdown-content">
                <Link to="/Taller_Mecanico">Agregar Taller Mecánico</Link>
              </div>
            </li>

            <li className="dropdown">
              <Link to="/AgregarPolipunto" className="dropbtn">Polipunto</Link>
              <div className="dropdown-content">
                <Link to="/AgregarPoliPunto">Agregar Polígono</Link>
                <Link to="/EditarPoliPunto">Editar</Link>
              </div>
            </li>
          </>
        )}

        {userData && (userData.role_id === 2) && (
          <li className="dropdown">
            <Link to="/ver_tallers">Ver talleres</Link>
          </li>
        )}

        <li className="navbar-end">
          {userData && (userData.role_id === 1) && (
            <Link to="/Register">Registrar</Link>
          )}
          <Link to="/Login" className="dropbtn">Iniciar Sesión</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;