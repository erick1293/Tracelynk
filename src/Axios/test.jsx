import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Table, FormControl, Form, Button } from 'react-bootstrap';

function AgregarMantencion() {
    const [datosMantencion, setDatosMantencion] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        idMecanico: '',
        idVehiculo: '',
        fecha: '',
        descripcion: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatosMantencion = async () => {
            try {
                const response = await fetch('http://localhost/Tracelink/Mantenimiento/dato.php');
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setDatosMantencion(data.mantenciones);
                }
            } catch (error) {
                console.error('Error al obtener los datos de mantención:', error);
                setError('Error al obtener los datos de mantención.');
            }
        };

        const cargarMecanicos = async () => {
            try {
                const response = await fetch('http://localhost/Tracelink/Mantenimiento/Mecanicos.php');
                const data = await response.json();
                setMecanicos(data);
            } catch (error) {
                console.error('Error al obtener los datos de mecánicos:', error);
                setError('Error al obtener los datos de mecánicos.');
            }
        };

        const cargarVehiculos = async () => {
            try {
                const response = await fetch('http://localhost/Tracelink/Mantenimiento/Vehiculos.php');
                const data = await response.json();
                setVehiculos(data);
            } catch (error) {
                console.error('Error al obtener los datos de vehículos:', error);
                setError('Error al obtener los datos de vehículos.');
            }
        };

        cargarDatosMantencion();
        cargarMecanicos();
        cargarVehiculos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoMantenimiento({ ...nuevoMantenimiento, [name]: value });
    };
    const cargarDatosMantencion = async () => {
        try {
            const response = await fetch('http://localhost/Tracelink/Mantenimiento/dato.php');
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setDatosMantencion(data.mantenciones);
            }
        } catch (error) {
            console.error('Error al obtener los datos de mantención:', error);
            setError('Error al obtener los datos de mantención.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/Tracelink/Mantenimiento/AgregarMantencion.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoMantenimiento)
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setNuevoMantenimiento({
                    idMecanico: '',
                    idVehiculo: '',
                    fecha: '',
                    descripcion: ''
                });
                cargarDatosMantencion();
            }
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
                <Form.Group>
                    <Form.Label>Mecánico</Form.Label>
                    <Form.Control as="select" name="idMecanico" value={nuevoMantenimiento.idMecanico} onChange={handleInputChange}>
                        <option value="">Seleccione un mecánico</option>
                        {mecanicos.map(mecanico => (
                            <option key={mecanico.idMecanico} value={mecanico.idMecanico}>{mecanico.nombre}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Vehículo</Form.Label>
                    <Form.Control as="select" name="idVehiculo" value={nuevoMantenimiento.idVehiculo} onChange={handleInputChange}>
                        <option value="">Seleccione un vehículo</option>
                        {vehiculos.map(vehiculo => (
                            <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.marca} {vehiculo.modelo}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="fecha" value={nuevoMantenimiento.fecha} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
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
                                <th>Especialidad</th>
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
                            </tr>
                        </thead>
                        <tbody>
                            {datosMantencion.map(mantencion => (
                                <tr key={mantencion.idMantencion}>
                                    <td>{mantencion.cita_id}</td>
                                    <td>{mantencion.mecanico_nombre}</td>
                                    <td>{mantencion.mecanico_especialidad}</td>
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
