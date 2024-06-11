import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function AgregarMantencion() {
    const [datosMantencion, setDatosMantencion] = useState([]);
    const [citas, setCitas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        idCita: '',
        idVehiculo: '',
        fecha: '',
        descripcion: ''
    });
    const [error, setError] = useState(null);

    const cargarDatosMantencion = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/Mantenimiento/dato.php');
            setDatosMantencion(response.data.mantenciones);
        } catch (error) {
            console.error('Error al obtener los datos de mantención:', error);
            setError('Error al obtener los datos de mantención.');
        }
    };

    useEffect(() => {
        const cargarCitas = async () => {
            try {
                const response = await axios.get('http://localhost/Tracelink/Mantenimiento/obtener_citas.php');
                setCitas(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de citas:', error);
                setError('Error al obtener los datos de citas.');
            }
        };

        const cargarVehiculos = async () => {
            try {
                const response = await axios.get('http://localhost/Tracelink/Mantenimiento/Vehiculos.php');
                setVehiculos(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de vehículos:', error);
                setError('Error al obtener los datos de vehículos.');
            }
        };

        cargarDatosMantencion();
        cargarCitas();
        cargarVehiculos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoMantenimiento({ ...nuevoMantenimiento, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos a enviar:", nuevoMantenimiento);
        try {
            const response = await axios.post('http://localhost/Tracelink/Mantenimiento/AgregarMantencion.php', nuevoMantenimiento);
            setNuevoMantenimiento({
                idCita: '',
                idVehiculo: '',
                fecha: '',
                descripcion: ''
            });
            cargarDatosMantencion();
        } catch (error) {
            console.error('Error al agregar la mantención:', error);
            setError('Error al agregar la mantención.');
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Agregar Mantención</h2>
            {error && <p>Error: {error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="idCita">
                    <Form.Label>Cita</Form.Label>
                    <Form.Control as="select" name="idCita" value={nuevoMantenimiento.idCita} onChange={handleInputChange}>
                        <option value="">Seleccione una cita</option>
                        {citas.map(cita => (
                            <option key={cita.id} value={cita.id}>{cita.nombre_mecanico} - {cita.fecha}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="idVehiculo">
                    <Form.Label>Vehículo</Form.Label>
                    <Form.Control as="select" name="idVehiculo" value={nuevoMantenimiento.idVehiculo} onChange={handleInputChange}>
                        <option value="">Seleccione un vehículo</option>
                        {vehiculos.map(vehiculo => (
                            <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.marca} {vehiculo.modelo}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="fecha" value={nuevoMantenimiento.fecha} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="descripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" name="descripcion" value={nuevoMantenimiento.descripcion} onChange={handleInputChange} />
                </Form.Group>
                <Button type="submit">Agregar Mantención</Button>
            </Form>
            {datosMantencion.length > 0 && (
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
                                <th>Vehículo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Transmisión</th>
                                <th>Patente</th>
                                <th>Kilometraje Inicial</th>
                                <th>Kilometraje Actual</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosMantencion.map(mantencion => (
                                <tr key={mantencion.idMantencion}>
                                    <td>{mantencion.cita_id}</td>
                                    <td>{mantencion.nombre_mecanico}</td>
                                    <td>{mantencion.hora}</td>
                                    <td>{mantencion.fecha}</td>
                                    <td>{mantencion.descripcion}</td>
                                    <td>{mantencion.vehiculo_id}</td>
                                    <td>{mantencion.marca}</td>
                                    <td>{mantencion.modelo}</td>
                                    <td>{mantencion.anio}</td>
                                    <td>{mantencion.transmision}</td>
                                    <td>{mantencion.patente}</td>
                                    <td>{mantencion.kilometrajeinicial}</td>
                                    <td>{mantencion.kilometrajeactual}</td>
                                    
                                    </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default AgregarMantencion;

