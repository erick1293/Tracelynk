import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Mapa = () => {
  const [position, setPosition] = useState([-27.3605358, -70.3350422]);

  // Obtener ubicación GPS y enviar al servidor cada 10 segundos
  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude]);
            sendLocationToServer(latitude, longitude);
          },
          (error) => console.error("Error obteniendo ubicación:", error)
        );
      } else {
        console.log("Geolocalización no disponible.");
      }
    };

    // Actualizar ubicación cada 10 segundos
    updateLocation(); // Actualización inicial
    const intervalId = setInterval(updateLocation, 10000); // 10 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
  }, []);

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        'http://ec2-54-221-134-204.compute-1.amazonaws.com/poligonos/guardar_ubicacion.php',
        { latitude, longitude },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Ubicación en tiempo real enviada:", response.data);
    } catch (error) {
      console.error("Error al enviar ubicación en tiempo real:", error);
    }
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} />
    </MapContainer>
  );
};

export default Mapa;
