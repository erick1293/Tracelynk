import React from 'react';
import Navbar from './Navbar'; // Importa el componente Navbar
import Mapa from './Mapa'; // Importa el componente Mapa
import "../stylesheets/Home.css";

export function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Mapa />
        </div>
        <div className="col-md-6">
          <MenuDerecha />
        </div>
      </div>
    </div>
  );
}

export function Maps() {
  return (
    <div>
      <p></p>
    </div>
  );
}

export function MenuDerecha() {
  return (
    <div className="menuDerecho">
    <h2 className="parametro">Parametros Del Vehiculo</h2>
    <ul id="misParametros"> 
      <li>Temperatura de motor: (80)</li><br/>
      <li>Combustible usado: (40 LTS)</li><br/>
      <li>Tiempo detenido: (15 Min)</li><br/>
      <li>Ubicación: (AVDA Los loros)</li><br/>
      <li>Siguiente mantención: (8.000 KM)</li><br/>
    </ul>
  </div>
  );
}
