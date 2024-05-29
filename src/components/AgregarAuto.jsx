import React from "react";
import '../stylesheets/AgregarAuto.css';
import Navbar from './Navbar';
function AgregarAuto(){
return(
<div>
        <Navbar/>
    <div className="formulario">
            <form id="formularioAuto">
            <label htmlFor="patente">Patente:</label><br/>
            <input type="text" id="patente" name="patente"/><br/>
            <label htmlFor="marca">Marca:</label><br/>
            <input type="text" id="marca" name="marca"/><br/>
            <label htmlFor="kilometrajeInicial">Kilometraje Inicial:</label><br/>
            <input type="number" id="kilometrajeInicial" name="kilometrajeInicial"/><br/>
            <label htmlFor="kilometrajeActual">Kilometraje Actual:</label><br/>
            <input type="number" id="kilometrajeActual" name="kilometrajeActual"/><br/>
            <input type="button" value="Agregar" id="btnAgregar"/>
            <input type="button" value="Modificar" id="btnModificar"/>
            <input type="button" value="Buscar" id="btnBuscar"/>
        </form>
    </div>
</div>
);

}

export default AgregarAuto;