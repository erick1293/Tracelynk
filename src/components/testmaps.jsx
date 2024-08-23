import React, { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mqtt from 'mqtt';
import { ErrorBoundary } from 'react-error-boundary';

// Fix marker icons issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost/Tracelink';
const FLESPI_TOKEN = 'BhJYncGU4q0kRyPPWTit3NTRSG957HtQ0wahr1wKqz6NjPvfM6SwW6uVd0ojWKeh';

// Initial state
const initialState = {
  allPoints: [],
  polygonCoordinates: [],
  poligonos: [],
  selectedPoligono: null,
  ubicaciones: [],
  position: [-27.360535800413754, -70.3350422675603],
  selectedUbicacion: "",
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_ALL_POINTS':
      return { ...state, allPoints: action.payload };
    case 'SET_POLYGON_COORDINATES':
      return { ...state, polygonCoordinates: action.payload };
    case 'SET_POLIGONOS':
      return { ...state, poligonos: action.payload };
    case 'SET_SELECTED_POLIGONO':
      return { ...state, selectedPoligono: action.payload };
    case 'SET_UBICACIONES':
      return { ...state, ubicaciones: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_SELECTED_UBICACION':
      return { ...state, selectedUbicacion: action.payload };
    default:
      return state;
  }
}

const Mapa = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enviarAlerta = useCallback(() => {
    axios.post(`${API_BASE_URL}/Alertas/Envia_Alertas.php`, {
      alert: true
    })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error("Hubo un error al enviar la alerta:", error);
    });
  }, []);

  const checkGeofence = useCallback(async (lat, lon) => {
    try {
      const response = await axios.get(`https://flespi.io/gw/geofences/all/hittest`, {
        params: { 'point.lat': lat, 'point.lon': lon },
        headers: { 'Authorization': `FlespiToken ${FLESPI_TOKEN}` }
      });
      if (response.data.result.length === 0) {
        console.log('Vehicle is outside the geofence');
        enviarAlerta();
      }
    } catch (error) {
      console.error('Error checking geofence:', error);
    }
  }, [enviarAlerta]);

  useEffect(() => {
    // Fetch polygons
    axios.get(`${API_BASE_URL}/poligonos/MostrarPoligonos.php`)
      .then(response => {
        dispatch({ type: 'SET_POLIGONOS', payload: response.data });
      })
      .catch(error => {
        console.error('Hubo un error al obtener los polígonos:', error);
      });

    // Fetch all points
    axios.get(`${API_BASE_URL}/poligonos/MostrarPunto.php`)
      .then(response => {
        dispatch({ type: 'SET_ALL_POINTS', payload: response.data });
      })
      .catch(error => {
        console.error('Error al obtener los puntos de los polígonos:', error);
      });

    // Connect to flespi MQTT
    const client = mqtt.connect('wss://mqtt.flespi.io', {
      username: FLESPI_TOKEN
    });

    client.on('connect', () => {
      client.subscribe('flespi/message/gw/devices/+');
    });

    client.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      if (data.position) {
        const newPosition = [data.position.latitude, data.position.longitude];
        dispatch({ type: 'SET_POSITION', payload: newPosition });
        checkGeofence(data.position.latitude, data.position.longitude);
      }
    });

    return () => client.end();
  }, [checkGeofence]);

  useEffect(() => {
    if (state.selectedPoligono) {
      const filteredPoints = state.allPoints
        .filter(punto => punto.Poligono_idPoligono === state.selectedPoligono)
        .map(punto => [parseFloat(punto.Latitud), parseFloat(punto.Longitud)]);
      dispatch({ type: 'SET_POLYGON_COORDINATES', payload: filteredPoints });
    } else {
      dispatch({ type: 'SET_POLYGON_COORDINATES', payload: [] });
    }
  }, [state.selectedPoligono, state.allPoints]);

  const handlePoligonoChange = (e) => {
    dispatch({ type: 'SET_SELECTED_POLIGONO', payload: e.target.value });
  };

  const handleUbicacionChange = (e) => {
    const ubicacionSeleccionada = state.ubicaciones.find(ubicacion => ubicacion.idUbicacion === e.target.value);
    if (ubicacionSeleccionada) {
      dispatch({ type: 'SET_POSITION', payload: [parseFloat(ubicacionSeleccionada.latitud), parseFloat(ubicacionSeleccionada.longitud)] });
    }
    dispatch({ type: 'SET_SELECTED_UBICACION', payload: e.target.value });
  };

  // Add this function to update the map view when the position changes
  const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <div>
          <select onChange={handlePoligonoChange}>
            <option value="">Seleccione un polígono</option>
            {state.poligonos.map((poligono) => (
              <option key={poligono.idPoligono} value={poligono.idPoligono}>
                {poligono.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={state.selectedUbicacion} onChange={handleUbicacionChange}>
            <option value="">Seleccione una ubicación</option>
            {state.ubicaciones.map((ubicacion) => (
              <option key={ubicacion.idUbicacion} value={ubicacion.idUbicacion}>
                Lat: {ubicacion.latitud}, Lon: {ubicacion.longitud}
              </option>
            ))}
          </select>
        </div>
      <div style={{ height: "900px", width: "100%" }}>
          <MapContainer 
            center={state.position} 
            zoom={14} 
            style={{ height: "100%", width: "100%" }}
            key={state.position.join(',')} // Force re-render on position change
          >
            <ChangeView center={state.position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={state.position}></Marker>
            {state.polygonCoordinates.length > 0 && (
              <Polygon positions={state.polygonCoordinates} color="purple" />
            )}
          </MapContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default React.memo(Mapa);
