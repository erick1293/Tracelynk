    import React, { useState, useEffect } from 'react';
    import Navbar from '../components/Navbar';
    import { Table, FormControl } from 'react-bootstrap';

    function AgregarMantencion() {
        const [datosMantencion, setDatosMantencion] = useState(null);
        const [error, setError] = useState(null);
        const [filtro, setFiltro] = useState('');
        const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);

        useEffect(() => {
            fetch('http://localhost/Tracelink/Mantenimiento/Datos.php')
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setDatosMantencion(data);
                        setVehiculosFiltrados(data.mantencionVehiculo); // Inicializar vehículos filtrados con todos los vehículos disponibles
                    }
                })
                .catch(error => {
                    console.error('Error al obtener los datos de mantención:', error);
                    setError('Error al obtener los datos de mantención.');
                });
        }, []);

        const handleBuscar = (e) => {
            const value = e.target.value;
            setFiltro(value);
            // Verificar si datosMantencion existe antes de intentar acceder a sus propiedades
            if (datosMantencion && datosMantencion.mantencionVehiculo) {
                const vehiculosFiltrados = datosMantencion.mantencionVehiculo.filter(vehiculo =>
                    vehiculo.marca.toLowerCase().includes(value.toLowerCase()) ||
                    vehiculo.modelo.toLowerCase().includes(value.toLowerCase())
                );
                setVehiculosFiltrados(vehiculosFiltrados);
            }
        };

        return (
            <div>
                <Navbar />
                <h2>Agregar Mantención</h2>
                {error && <p>Error: {error}</p>}
                {datosMantencion && (
                    <div>
                        <h3>Detalles de la Mantención:</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID de Cita</th>
                                    <th>Nombre del Mecánico</th>
                                    <th>Hora</th>
                                    <th>Fecha de Mantención</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datosMantencion.citas.map(cita => (
                                    <tr key={cita.id}>
                                        <td>{cita.id}</td>
                                        <td>{cita.nombre_mecanico}</td>
                                        <td>{cita.hora}</td>
                                        <td>{cita.fecha}</td>
                                        <td>{cita.descripcion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <h3>Detalles del Vehículo:</h3>
                        <FormControl type="text" placeholder="Buscar..." className="mb-3" onChange={handleBuscar} />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>MARCA</th>
                                    <th>MODELO</th>
                                    <th>AÑO</th>
                                    <th>Transmisión</th>
                                    <th>PATENTE</th>
                                    <th>Kilometraje Inicial</th>
                                    <th>Kilometraje Actual</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehiculosFiltrados.length > 0 ? (
                                    vehiculosFiltrados.map(v => (
                                        <tr key={v.id}>
                                            <td>{v.id}</td>
                                            <td>{v.marca}</td>
                                            <td>{v.modelo}</td>
                                            <td>{v.anio}</td>
                                            <td>{v.transmision}</td>
                                            <td>{v.patente}</td>
                                            <td>{v.kilometrajeinicial}</td>
                                            <td>{v.kilometrajeactual}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No se encontraron vehículos</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        );
    }

    export default AgregarMantencion;
