import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Menu = () => {
    return (
        <Router>
            <div className="menu">
                <ul className="main-menu">
                    <li><Link to="/">Inicio</Link></li>
                    <li>
                        Vehiculo
                        <ul className="sub-menu">
                            <li><Link to="/agregar-vehiculo">Agregar</Link></li>
                            <li><Link to="/buscar-vehiculo">Buscar</Link></li>
                        </ul>
                    </li>
                    <li>
                        Objeto
                        <ul className="sub-menu">
                            <li><Link to="/agregar-objeto">Agregar</Link></li>
                            <li><Link to="/buscar-objeto">Buscar</Link></li>
                            <li><Link to="/asignar-objeto">Asignar</Link></li>
                        </ul>
                    </li>
                    <li>
                        Generar Puntos
                        <ul className="sub-menu">
                            <li><Link to="/agregar-puntos">Agregar</Link></li>
                            <li><Link to="/mostrar-puntos">Mostrar</Link></li>
                        </ul>
                    </li>
                    <li>
                        Cita
                        <ul className="sub-menu">
                            <li><Link to="/agendar-cita">Agendar</Link></li>
                            <li><Link to="/mostrar-cita">Mostrar</Link></li>
                        </ul>
                    </li>
                    <li>
                        Historial de Mantencion
                        <ul className="sub-menu">
                            <li><Link to="/mostrar-historial">Mostrar</Link></li>
                            <li><Link to="/buscar-historial">Buscar</Link></li>
                        </ul>
                    </li>
                    <li>
                        Sensor
                        <ul className="sub-menu">
                            <li><Link to="/agregar-sensor">Agregar Sensor</Link></li>
                            <li><Link to="/valores-sensor">Valores de Sensor</Link></li>
                        </ul>
                    </li>
                    <li>
                        Respuestos
                        <ul className="sub-menu">
                            <li><Link to="/agregar-repuesto">Agregar Repuesto</Link></li>
                            <li><Link to="/categoria-repuesto">Categoria</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/estado">Estado</Link></li>
                    <li><Link to="/ubicacion">Ubicacion</Link></li>
                </ul>
            </div>

            <Switch>
                <Route path="/agregar-vehiculo">
                    {/* <AgregarVehiculo /> */}
                </Route>
                <Route path="/buscar-vehiculo">
                    {/* <BuscarVehiculo /> */}
                </Route>
                {/* ...resto de las rutas... */}
                <Route path="/">
                    {/* <Inicio /> */}
                </Route>
            </Switch>
        </Router>
    );
};

export default Menu;

