import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from 'react-leaflet';
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
  const [poligonoSeleccionado, setPoligonoSeleccionado] = useState(null);
  const [puntos, setPuntos] = useState([]);
  const [position, setPosition] = useState([-27.360535800413754, -70.3350422675603]);

  useEffect(() => {
    cargarPoligonos();
  }, []);

  useEffect(() => {
    if (poligonoSeleccionado) {
      cargarPuntos(poligonoSeleccionado.idPoligono);
    } else {
      setPuntos([]);
    }
  }, [poligonoSeleccionado]);

  const cargarPoligonos = () => {
    axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php')
      .then(response => {
        setPoligonos(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const cargarPuntos = (idPoligono) => {
    axios.get(`http://localhost/Tracelink/poligonos/MostrarPunto.php?poligono=${idPoligono}`)
      .then(response => {
        const puntosFiltrados = response.data.filter(punto => punto.Poligono_idPoligono === idPoligono);
        setPuntos(puntosFiltrados.map(punto => ({ latitud: punto.Latitud, longitud: punto.Longitud })));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
    if (!poligonoSeleccionado) {
      alert('Por favor, selecciona un polígono.');
      return;
    }

    const idPoligono = poligonoSeleccionado.idPoligono;
    for (let i = 0; i < puntos.length; i++) {
      const punto = puntos[i];
      const formData = new FormData();
      formData.append('longitud', punto.longitud);
      formData.append('latitud', punto.latitud);
      formData.append('idPoligono', idPoligono);
  
      // Verificar si el punto ya está registrado en la base de datos
      axios.get(`http://localhost/Tracelink/poligonos/VerificarPunto.php?latitud=${punto.latitud}&longitud=${punto.longitud}&idPoligono=${idPoligono}`)
        .then(response => {
          if (response.data.exists) {
            console.log(`El punto ${i + 1} ya está registrado en la base de datos.`);
          } else {
            // Si el punto no está registrado, agregarlo a la base de datos
            axios.post('http://localhost/Tracelink/poligonos/AgregarPunto.php', formData)
              .then(response => {
                console.log(`Punto ${i + 1}: ${response.data.message}`);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    alert('Todos los puntos han sido verificados y los nuevos puntos han sido agregados exitosamente.');
  };
  

  const getPolygonCoordinates = () => {
    return puntos
      .map(punto => {
        const lat = parseFloat(punto.latitud);
        const lng = parseFloat(punto.longitud);
        return !isNaN(lat) && !isNaN(lng) ? [lat, lng] : null;
      })
      .filter(coord => coord !== null);
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
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', padding: '10px' }}>
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
        <form onSubmit={(e) => { e.preventDefault(); handleAgregarPuntos(); }}>
          <label>
            Selecciona un Polígono:
            <select value={poligonoSeleccionado && poligonoSeleccionado.idPoligono} onChange={(e) => setPoligonoSeleccionado(poligonos.find(poligono => poligono.idPoligono === e.target.value))}>
              <option value="">Seleccione un polígono</option>
              {poligonos.map((poligono, index) => (
                <option key={index} value={poligono.idPoligono}>{poligono.nombre}</option>
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

      <div style={{ width: '50%', height: '500px' }}>
        <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {puntos.map((punto, index) => {
            const lat = parseFloat(punto.latitud);
            const lng = parseFloat(punto.longitud);
            if (!isNaN(lat) && !isNaN(lng)) {
              return <Marker key={index} position={[lat, lng]}></Marker>;
            }
            return null;
          })}
          {getPolygonCoordinates().length > 2 && (
            <Polygon positions={getPolygonCoordinates()} color="purple" />
          )}
          <MapClickHandler />
        </MapContainer>
      </div>
    </div>
  );
}

export default AgregarPoligono;
