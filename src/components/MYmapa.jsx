import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Mapa = () => {
  const [allPoints, setAllPoints] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [poligonos, setPoligonos] = useState([]);
  const [selectedPoligono, setSelectedPoligono] = useState(null);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [position, setPosition] = useState([-27.360535800413754, -70.3350422675603]); // Default position
  const [selectedUbicacion, setSelectedUbicacion] = useState("");

  // Obtener los polígonos disponibles
  useEffect(() => {
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/poligonos/MostrarPoligonos.php')
      .then(response => {
        setPoligonos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los polígonos:', error);
      });

    // Obtener todos los puntos una vez
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/poligonos/MostrarPunto.php')
      .then(response => {
        setAllPoints(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los puntos de los polígonos:', error);
      });

    // Obtener la ubicación del vehículo
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/poligonos/MostrarUbicacion.php')
      .then(response => {
        setUbicaciones(response.data);
        if (response.data.length > 0) {
          const ubicacion = response.data[0]; // Usar la primera ubicación como la posición del vehículo
          setPosition([parseFloat(ubicacion.latitud), parseFloat(ubicacion.longitud)]);
        }
      })
      .catch(error => {
        console.error('Error al obtener la ubicación del vehículo:', error);
      });
  }, []);

  // Filtrar los puntos del polígono seleccionado
  useEffect(() => {
    if (selectedPoligono) {
      const filteredPoints = allPoints
        .filter(punto => punto.Poligono_idPoligono === selectedPoligono)
        .map(punto => [parseFloat(punto.Latitud), parseFloat(punto.Longitud)]);
      setPolygonCoordinates(filteredPoints);
    } else {
      setPolygonCoordinates([]);
    }
  }, [selectedPoligono, allPoints]);

  const enviarAlerta = () => {
      axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Alertas/Envia_Alertas.php', {
          alert: true
      })
      .then(response => {
          console.log(response.data.message);
      })
      .catch(error => {
          console.error("Hubo un error al enviar la alerta:", error);
      });
  };
  
  // Llama a esta función cuando necesites enviar la alerta
  enviarAlerta();
  
  useEffect(() => {
    const intervalId = setInterval(() => {
        setSelectedUbicacion(prevSelectedUbicacion => {
            const currentIndex = ubicaciones.findIndex(ubicacion => ubicacion.idUbicacion === prevSelectedUbicacion);
            const nextIndex = (currentIndex + 1) % ubicaciones.length;
            const nextUbicacion = ubicaciones[nextIndex];
            
            if (nextUbicacion) {
                const newLat = parseFloat(nextUbicacion.latitud);
                const newLng = parseFloat(nextUbicacion.longitud);

                // Verifica si la latitud y longitud son válidas
                if (!isNaN(newLat) && !isNaN(newLng)) {
                    setPosition([newLat, newLng]);

                    // Verificar si la ubicación del vehículo está dentro del polígono
                    if (polygonCoordinates.length > 0) {
                        const vehicleLocation = L.latLng(newLat, newLng);
                        const polygon = L.polygon(polygonCoordinates);
                        if (!polygon.getBounds().contains(vehicleLocation)) {
                            console.log("¡Alerta! El vehículo ha salido del polígono");

                            // Enviar alerta al servidor PHP
                            axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Alertas/Envia_Alertas.php', {
                                alert: true
                            })
                            .then(response => {
                                console.log(response.data.message);
                            })
                            .catch(error => {
                                console.error('Error al enviar la alerta:', error);
                            });
                        }
                    }
                }
            }
            return nextUbicacion.idUbicacion;
        });
    }, 20000000); // 2000 para que avance normal

    return () => clearInterval(intervalId);
}, [ubicaciones, polygonCoordinates]);

  

  const handlePoligonoChange = (e) => {
    setSelectedPoligono(e.target.value);
  };

  const handleUbicacionChange = (e) => {
    const ubicacionSeleccionada = ubicaciones.find(ubicacion => ubicacion.idUbicacion === e.target.value);
    if (ubicacionSeleccionada) {
      setPosition([parseFloat(ubicacionSeleccionada.latitud), parseFloat(ubicacionSeleccionada.longitud)]);
    }
    setSelectedUbicacion(e.target.value);
  };

  return (
    <div>
      <div>
        <select onChange={handlePoligonoChange}>
          <option value="">Seleccione un polígono</option>
          {poligonos.map((poligono) => (
            <option key={poligono.idPoligono} value={poligono.idPoligono}>
              {poligono.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={selectedUbicacion} onChange={handleUbicacionChange}>
          <option value="">Seleccione una ubicación</option>
          {ubicaciones.map((ubicacion) => (
            <option key={ubicacion.idUbicacion} value={ubicacion.idUbicacion}>
              Lat: {ubicacion.latitud}, Lon: {ubicacion.longitud}
            </option>
          ))}
        </select>
      </div>
      <div style={{ height: "900px", width: "100%" }}>
        <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}></Marker>
          {polygonCoordinates.length > 0 && (
            <Polygon positions={polygonCoordinates} color="purple"></Polygon>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Mapa;
 