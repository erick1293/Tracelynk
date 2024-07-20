import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../components/Navbar';

// Fix marker icons issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function AgregarPoligono() {
  const [nombre, setNombre] = useState('');
  const [poligonos, setPoligonos] = useState([]);
  const [poligonoSeleccionado, setPoligonoSeleccionado] = useState('');
  const [puntos, setPuntos] = useState([]);
  const [position, setPosition] = useState([-27.360535800413754, -70.3350422675603]); 

  const cargarPoligonos = () => {
    axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php')
      .then(response => {
        setPoligonos(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    cargarPoligonos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const poligono = { nombre };
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
    const idPoligono = poligonos.find(poligono => poligono.nombre === poligonoSeleccionado).idPoligono;
    for (let i = 0; i < puntos.length; i++) {
      const punto = puntos[i];
      const formData = new FormData();
      formData.append('longitud', punto.longitud);
      formData.append('latitud', punto.latitud);
      formData.append('idPoligono', idPoligono);
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

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const confirmAdd = window.confirm(`¿Desea agregar el punto con Latitud: ${lat} y Longitud: ${lng}?`);
        if (confirmAdd) {
          const newPuntos = [...puntos];
          newPuntos.push({ latitud: lat.toString(), longitud: lng.toString() });
          setPuntos(newPuntos);
        }
      },
    });
    return null;
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

      <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {puntos.map((punto, index) => {
            const lat = parseFloat(punto.latitud);
            const lng = parseFloat(punto.longitud);
            if (!isNaN(lat) && !isNaN(lng)) {
              return <Marker key={index} position={[lat, lng]}></Marker>;
            }
            return null;
          })}
          <MapClickHandler />
        </MapContainer>
      </div>
    </div>
  );
};

export default AgregarPoligono;
