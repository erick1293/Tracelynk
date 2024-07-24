import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function EditarPoligono() {
  const [poligonos, setPoligonos] = useState([]);
  const [poligonoSeleccionado, setPoligonoSeleccionado] = useState('');
  const [puntos, setPuntos] = useState([]);
  const [position, setPosition] = useState([-27.360535800413754, -70.3350422675603]);

  useEffect(() => {
    axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php')
      .then(response => {
        setPoligonos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los polígonos:', error);
      });
  }, []);

  useEffect(() => {
    if (poligonoSeleccionado) {
      axios.get(`http://localhost/Tracelink/poligonos/MostrarPunto.php?poligono=${poligonoSeleccionado}`)
        .then(response => {
          const puntosFiltrados = response.data.filter(punto => punto.Poligono_idPoligono === poligonoSeleccionado);
          setPuntos(puntosFiltrados);
        })
        .catch(error => {
          console.error('Error al obtener los puntos del polígono:', error);
        });
    } else {
      setPuntos([]);
    }
  }, [poligonoSeleccionado]);

  const handleGuardarCambios = () => {
    puntos.forEach((punto, index) => {
      if (punto.idPuntos && punto.Latitud && punto.Longitud) {
        console.log(`Enviando punto ${index + 1}:`, punto);
        axios.post('http://localhost/Tracelink/poligonos/EditarPunto.php', punto)
          .then(response => {
            console.log(`Punto ${index + 1}: ${response.data.message}`);
          })
          .catch(error => {
            console.error('Error al enviar el punto:', error);
          });
      } else {
        console.warn(`Punto ${index + 1} tiene campos undefined:`, punto);
      }
    });
    alert('Todos los puntos han sido actualizados exitosamente.');
  };

  const handleEliminarPunto = (idPunto) => {
    axios.post('http://localhost/Tracelink/poligonos/EliminarPoliPunto.php', { idPuntos: idPunto })
      .then(response => {
        if (response.data.success) {
          alert('Punto eliminado correctamente');
          setPuntos(puntos.filter(punto => punto.idPuntos !== idPunto));
        } else {
          alert('Error al eliminar el punto');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el punto:', error);
      });
  };

  const handleDragEnd = (index, e) => {
    const { lat, lng } = e.target.getLatLng();
    const newPuntos = [...puntos];
    newPuntos[index].Latitud = lat.toString();
    newPuntos[index].Longitud = lng.toString();
    setPuntos(newPuntos);

    const updatedPunto = {
      idPuntos: newPuntos[index].idPuntos,
      Latitud: newPuntos[index].Latitud,
      Longitud: newPuntos[index].Longitud,
    };

    console.log(`Actualizando punto ${index + 1}:`, updatedPunto);
    if (updatedPunto.idPuntos && updatedPunto.Latitud && updatedPunto.Longitud) {
      axios.post('http://localhost/Tracelink/poligonos/EditarPunto.php', updatedPunto)
        .then(response => {
          console.log(`Punto ${index + 1}: ${response.data.message}`);
        })
        .catch(error => {
          console.error('Error al actualizar el punto:', error);
        });
    } else {
      console.warn(`Punto ${index + 1} tiene campos undefined:`, updatedPunto);
    }
  };

  const getPolygonCoordinates = () => {
    return puntos.map(punto => [parseFloat(punto.Latitud), parseFloat(punto.Longitud)]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', padding: '10px' }}>
        <h1>Editar Puntos</h1>
        <label>
          Selecciona un Polígono:
          <select value={poligonoSeleccionado} onChange={(e) => setPoligonoSeleccionado(e.target.value)}>
            <option value="">Seleccione un polígono</option>
            {poligonos.map((poligono, index) => (
              <option key={index} value={poligono.idPoligono}>{poligono.nombre}</option>
            ))}
          </select>
        </label>
        <h1>Editar Puntos</h1>
        {puntos.map((punto, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label>
                  Id:
                  <input
                    type="text"
                    value={punto.idPuntos}
                    disabled
                  />
                </label>

            <label style={{ marginRight: '10px' }}>
              Latitud:
              <input
                type="text"
                value={punto.Latitud}
                onChange={(e) => {
                  const newPuntos = [...puntos];
                  newPuntos[index].Latitud = e.target.value;
                  setPuntos(newPuntos);
                }}
                required
              />
            </label>
            <label style={{ marginRight: '10px' }}>
              Longitud:
              <input
                type="text"
                value={punto.Longitud}
                onChange={(e) => {
                  const newPuntos = [...puntos];
                  newPuntos[index].Longitud = e.target.value;
                  setPuntos(newPuntos);
                }}
                required
              />
            </label>
            <button onClick={() => handleEliminarPunto(punto.idPuntos)}>Eliminar</button>
          </div>
        ))}
        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
      </div>

      <div style={{ width: '50%', height: '500px' }}>
        <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {puntos.map((punto, index) => {
            const lat = parseFloat(punto.Latitud);
            const lng = parseFloat(punto.Longitud);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <Marker
                  key={index}
                  position={[lat, lng]}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => handleDragEnd(index, e),
                  }}
                >
                  <Popup>
                    ID del Punto: {punto.idPuntos || 'Nuevo'}<br />
                    Latitud: {punto.Latitud}<br />
                    Longitud: {punto.Longitud}
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
          {puntos.length > 2 && (
            <Polygon positions={getPolygonCoordinates()} color="purple" />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default EditarPoligono;
