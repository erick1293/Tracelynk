import React from 'react';
import '../stylesheets/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../stylesheets/imagen.png';
function Navbar({ userData, handleLogout }) {
  return (
    <nav >
      
      <ul>
      <img src={logo} className="navbar-logo" alt="Logo" /> 

        <li><Link to="/">Inicio</Link></li>

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
              <Link to="/EditarCita" className="dropbtn">Mostrar  Citas</Link>
              <Link to="/mostrar_mante">Ver Mantencion</Link>
            </div>

          </li>
        )}



{userData && (userData.role_id === 1 || userData.role_id === 3) && (
          <li className="dropdown">
            <Link to="/AgregarObjeto" className="dropbtn">Carga </Link>
            <div className="dropdown-content">
            <Link to="/AgregarObjeto" className="dropbtn">Agregar Objetos</Link>
              <Link to="/AñadirEstadoObjeto">Añadir estado / Objeto</Link>
            </div>

          </li>
        )}

{userData && (userData.role_id === 1 || userData.role_id === 3) && (
          <>
            <li className="dropdown">
            <Link to="/Estados" className="dropbtn">Estados Vehiculos</Link>
              <div className="dropdown-content">
                <Link to="/Estados">Estado Vehiculo</Link>
                <Link to="/EditarEstado">Modificar/Mostrar</Link>
              </div>
            
            </li>

          </>
        )}

        {userData && (userData.role_id === 1 || userData.role_id === 3) && (
          <li className="dropdown">
            <Link to="/AgregarVehiculo" className="dropbtn">Vehículo</Link>
            <div className="dropdown-content">
              <Link to="/AgregarVehiculo">Agregar</Link>
              <Link to="/ModificarVehiculos">Modificar/Mostrar</Link>
              <Link to="/Alerta_Vehiculos">Alertas Vehiculos</Link>
            </div>
          </li>
        )}

        {userData && (userData.role_id === 2) && (
          <li className="dropdown">
            <Link to="/ModificarVehiculos" className="dropbtn">Ver Vehiculos </Link>
            <div className="dropdown-content">
              <Link to="/ModificarVehiculos" className="dropbtn">Ver Vehiculos </Link>
              <Link to="/Alerta_Vehiculos">Alertas Vehiculos</Link>
            </div>

          </li>
        )}



     {userData && (userData.role_id === 1 || userData.role_id === 3) && (
          <>
            <li className="dropdown">
              <Link to="/Taller_Mecanico" className="dropbtn">Taller Mecanico</Link>
              <div className="dropdown-content">
                <Link to="/Taller_Mecanico">Agregar</Link>
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

        <li className="dropdown login-dropdown" >
          <Link to="/Login" className="dropbtn">Login</Link>

          <div className="dropdown-content">
            <Link to="/Login">Login</Link>

            <button onClick={handleLogout}>Cerrar sesion</button>
          </div>
        </li>
        {userData && (userData.role_id === 1) && (
          <Link to="/Register">Registrar</Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;