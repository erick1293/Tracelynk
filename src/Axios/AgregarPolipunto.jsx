import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function AgregarPoligono() {
  const [nombre, setNombre] = useState('');
  const [poligonos, setPoligonos] = useState([]);
  const [poligonoSeleccionado, setPoligonoSeleccionado] = useState('');
  const [puntos, setPuntos] = useState([{ latitud: '', longitud: '' }]);
 const cargarPoligonos = ()=>{
// Obtener los polígonos al cargar el componente
axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php')
.then(response => {
  setPoligonos(response.data);
})
.catch((error) => {
  console.error('Error:', error);
});
 }
  useEffect(() => {
    cargarPoligonos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del polígono
    const poligono = { nombre };

    // Enviar los datos al servidor
    axios.post('http://localhost/Tracelink/poligonos/AgregarPoligono.php', poligono)
      .then(response => {
        alert(response.data.message);
        setNombre('');
        cargarPoligonos();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleAddPunto = () => {
    setPuntos([...puntos, { latitud: '', longitud: '' }]);
  };

  const handleRemovePunto = (index) => {
    const newPuntos = [...puntos];
    newPuntos.splice(index, 1);
    setPuntos(newPuntos);
  };


  const handleAgregarPuntos = () => {
    // Enviar los puntos al servidor
    const idPoligono = poligonos.find(poligono => poligono.nombre === poligonoSeleccionado).idPoligono;
    for (let i = 0; i < puntos.length; i++) {
      const punto = puntos[i];
      const formData = new FormData();
      formData.append('longitud', punto.longitud);
      formData.append('latitud', punto.latitud);
      formData.append('idPoligono', idPoligono);
      console.log(formData);
      axios.post('http://localhost/Tracelink/poligonos/AgregarPunto.php', formData)
        .then(response => {
          console.log(`Punto ${i + 1}: ${response.data.message}`);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    alert('Todos los puntos han sido agregados exitosamente.');
};

  

  return (
    <div>
      <h1>Agregar Polígono</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Polígono:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar Polígono</button>
      </form>

      <h1>Agregar Punto</h1>
      <form onSubmit={handleAgregarPuntos}>
        <label>
          Selecciona un Polígono:
          <select value={poligonoSeleccionado} onChange={(e) => setPoligonoSeleccionado(e.target.value)}>
            {poligonos.map((poligono, index) => (
              <option key={index} value={poligono.nombre}>{poligono.nombre}</option>
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
                onChange={(e) => {
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
                onChange={(e) => {
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
};

export default AgregarPoligono;