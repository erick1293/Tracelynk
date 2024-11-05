import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cargar_selects } from '../components/Home';

// Fix marker icons issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Cargar_selec = () => {
    const [poligonos, setPoligonos] = useState([]);
    const position = [-27.360535800413754, -70.3350422675603]; 
    const polygonCoordinates = [  
        [-27.63360547581458,-70.3086136488491],
        [-27.351702581932837 , -70.36877898892281],
        [-27.380347504022765, -70.3461700066091],
        [-27.42293152950013, -70.29230581781657],
        [-27.392833963748277,  -70.26569830453009]
    ];

    useEffect(() => {
        axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/poligonos/MostrarPoligonos.php')
            .then(response => {
                setPoligonos(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los polígonos:', error);
            });
    }, []);

    return (
        <div>
            <select>
                {poligonos.map((poligono, index) => (
                    <option key={index} value={poligono.idPoligono}>
                        {poligono.nombre}
                    </option>
                ))}
            </select>
            <MapContainer center={position} zoom={14} style={{ height: "600%" ,width: "250%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                </Marker>
                <Polygon positions={polygonCoordinates} color="purple">
                    
                </Polygon>
            </MapContainer>
        </div>
    );
}

export default Cargar_selec;