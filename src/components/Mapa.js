import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
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
    const position = [-27.33360547581458,-70.3086136488491]; // Latitud y longitud inicial

    // Definir coordenadas del polígono
    const polygonCoordinates = [
        [ -27.33360547581458,-70.3086136488491 ],
        [-27.351702581932837 , -70.36877898892281],
        [ -27.42293152950013, -70.29230581781657 ],
     [-27.392833963748277,  -70.26569830453009],
    
    ];

    return (
        <MapContainer center={position} zoom={13} style={{ height: "600%" ,width: "250%" , position: "  relative" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Polygon positions={polygonCoordinates} color="purple">
                <Popup>
                    A polygon.
                </Popup>
            </Polygon>
        </MapContainer>
    );
}

export default Mapa;