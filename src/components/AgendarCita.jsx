
import React from "react";
import Navbar from './Navbar';

function AgendarCita(){
   
    return(
        <div>
        <Navbar/>
        <form id="formularioCita">
        <label htmlFor="nombreMecanico">Nombre del Mecánico:</label><br/>
        <input type="text" id="nombreMecanico" name="nombreMecanico"/><br/>
        <label htmlFor="fecha">Fecha:</label><br/>
        <input type="date" id="fecha" name="fecha"/><br/>
        <label htmlFor="patenteVehiculo">Patente del Vehículo:</label><br/>
        <select id="patenteVehiculo" name="patenteVehiculo">
            <option value="">Selecciona una patente</option>
            {/* Aquí puedes agregar las opciones de patente */}
        </select><br/>
        <input type="submit" value="Agendar Cita"/>
    </form>
        </div>
    );
}


import React from "react";
import Navbar from './Navbar';
import "../stylesheets/AgendarCita.css"
 

function AgendarCita(){
   
    return(
        <div>
        <Navbar/>
        <form id="formularioCita">
        <label htmlFor="nombreMecanico">Nombre del Mecánico:</label><br/>
        <input type="text" id="nombreMecanico" name="nombreMecanico"/><br/>
        <label htmlFor="fecha">Fecha:</label><br/>
        <input type="date" id="fecha" name="fecha"/><br/>
        <label htmlFor="patenteVehiculo">Patente del Vehículo:</label><br/>
        <select id="patenteVehiculo" name="patenteVehiculo">
            <option value="">Selecciona una patente</option>
            {/* Aquí puedes agregar las opciones de patente */}
        </select><br/>
        <input type="submit" value="Agendar Cita"/>
    </form>
        </div>
    );
}

export default AgendarCita;