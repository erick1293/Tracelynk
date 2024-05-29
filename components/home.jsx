// se importo react
import React from "react";
import "../stylesheets/MenuDerecha.css"

export function MenuDerecha(){
    return(
      
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

    );
  }

  // creamos la funcion maps con export por nombre

  export function Maps(){
    return(
<p>aqui va el mapa en la zona izquierda</p>
    );
  }
  export function Navegador(){
  return(
<div className="Navegador">
      <a href="#home">Inicio</a>
      <a href="#about">Acerca de</a>
      <a href="#contact">Contacto</a>
</div>
  );
}

  