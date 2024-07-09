import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function AgregarPoligono() {
  const [nombre, setNombre] = useState('');
  const [poligonos, setPoligonos] = useState([]);
  const [poligonoSeleccionado, setPoligonoSeleccionado] = useState('');
  const [puntos, setPuntos] = useState([{ latitud: '', longitud: '' }]);

  // Cargar los polígonos al iniciar el componente
  useEffect(() => {
    cargarPoligonos();
  }, []);

  // Función para obtener los polígonos desde el servidor
  const cargarPoligonos = () => {
    axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php')
      .then(response => {
        setPoligonos(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Manejar el envío del formulario para agregar un polígono
  const handleSubmit = e => {
    e.preventDefault();
    const poligono = { nombre };
    axios.post('http://localhost/Tracelink/poligonos/AgregarPoligono.php', poligono)
      .then(response => {
        alert(response.data.message);
        setNombre('');
        cargarPoligonos();
      })
      .catch(error => {
        console.error('Error al agregar polígono:', error);
        alert('Hubo un error al agregar el polígono. Por favor, intenta nuevamente.');
      });
  };

  // Agregar un nuevo punto al polígono
  const handleAddPunto = () => {
    setPuntos([...puntos, { latitud: '', longitud: '' }]);
  };

  // Eliminar un punto del polígono
  const handleRemovePunto = index => {
    const newPuntos = [...puntos];
    newPuntos.splice(index, 1);
    setPuntos(newPuntos);
  };

  // Enviar todos los puntos al servidor
  const handleAgregarPuntos = () => {
    const idPoligono = poligonos.find(poligono => poligono.nombre === poligonoSeleccionado)?.idPoligono;

    // Construir el array de puntos a enviar
    const puntosData = puntos.map(punto => ({
      longitud: punto.longitud.toString(), // Convertir a texto
      latitud: punto.latitud.toString(),   // Convertir a texto
      idPoligono: idPoligono
    }));

    // Enviar los datos al servidor
    axios.post('http://localhost/Tracelink/poligonos/AgregarPunto.php', { puntos: puntosData })
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error al agregar puntos:', error);
        alert('Hubo un error al agregar los puntos. Por favor, intenta nuevamente.');
      });
  };

  return (
    <div>
      <Navbar />
      <h1>Agregar Polígono</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Polígono:
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar Polígono</button>
      </form>

      <h1>Agregar Punto</h1>
      <form onSubmit={handleAgregarPuntos}>
        <label>
          Selecciona un Polígono:
          <select value={poligonoSeleccionado} onChange={e => setPoligonoSeleccionado(e.target.value)}>
            {poligonos.map((poligono, index) => (
              <option key={index} value={poligono.nombre}>
                {poligono.nombre} (ID: {poligono.idPoligono})
              </option>
            ))}
          </select>
        </label>
        {puntos.map((punto, index) => (
          <div key={index}>
            <label>
              Latitud:
              <input
                type="text"
                value={punto.latitud}
                onChange={e => {
                  const newPuntos = [...puntos];
                  newPuntos[index].latitud = e.target.value;
                  setPuntos(newPuntos);
                }}
                required
              />
            </label>
            <label>
              Longitud:
              <input
                type="text"
                value={punto.longitud}
                onChange={e => {
                  const newPuntos = [...puntos];
                  newPuntos[index].longitud = e.target.value;
                  setPuntos(newPuntos);
                }}
                required
              />
            </label>
            <button type="button" onClick={() => handleRemovePunto(index)}>Quitar Punto</button>
          </div>
        ))}
        <button type="button" onClick={handleAddPunto}>Añadir Punto</button>
        <button type="submit">Enviar Puntos</button>
      </form>
    </div>
  );
}

export default AgregarPoligono;
