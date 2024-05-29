import React from 'react';
import Navbar from './Navbar'; // Importa el componente Navbar

export function MenuDerecha() {
  return (
    <div>
      <Navbar /> 
      <div className="menuDerecho">
        <div className="menuDerecho1">
          <h2 className="parametro">Parametros</h2>
          <ul id="misParametros">
            <li>Temperatura de motor: (80)</li>
            <li>Combustible usado: (40 LTS)</li>
            <li>Tiempo detenido: (15 Min)</li>
            <li>Ubicación: (AVDA Los loros)</li>
            <li>Siguiente mantención: (8.000 KM)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Maps() {
  return (
    <div>
      <Navbar /> {/* Incluye el Navbar aquí */}
      <p>aqui va el mapa en la zona izquierda</p>
    </div>
  );
}

export function Navegador() {
  return (
    <div>
      <Navbar /> {/* Incluye el Navbar aquí */}
      <div className="Navegador">
        <a href="#home">Inicio</a>
        <a href="#about">Acerca de</a>
        <a href="#contact">Contacto</a>
      </div>
    </div>
  );
}
