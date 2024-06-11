import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Table, Form, Button, Modal } from 'react-bootstrap';
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
    const [editando, setEditando] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mantencionSeleccionada, setMantencionSeleccionada] = useState(null);
    const [editarMantenimiento, setEditarMantenimiento] = useState({
        idCita: '',
        idVehiculo: '',
        fecha: '',
        descripcion: ''
    });

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

    const handleCitaChange = (e) => {
        const idCita = e.target.value;
        const citaSeleccionada = citas.find(cita => cita.id === idCita);
        if (citaSeleccionada) {
            setNuevoMantenimiento(prevState => ({
                ...prevState,
                idCita: citaSeleccionada.id,
            }));
        }
    }
    const handleVehiculoChange = (e) => {
        const idVehiculo = e.target.value;
        const vehiculoSeleccionado = vehiculos.find(vehiculo => vehiculo.id === idVehiculo);
        if (vehiculoSeleccionado) {
            setNuevoMantenimiento(prevState => ({
                ...prevState,
                idVehiculo: vehiculoSeleccionado.id,
            }));
        }
    };

    const handleModificar = (idMantencion) => {
        const mantencion = datosMantencion.find(m => m.idMantencion === idMantencion);
        if (mantencion) {
            setMantencionSeleccionada(mantencion);
            setEditarMantenimiento({
                idCita: mantencion.cita_id,
                idVehiculo: mantencion.vehiculo_id,
                fecha: mantencion.fecha,
                descripcion: mantencion.descripcion
            });
            setShowModal(true);
        } else {
            console.error('Mantención no encontrada con el ID:', idMantencion);
        }
    };

// Después de ejecutar la solicitud de edición en tu función handleSubmitEditar
const handleSubmitEditar = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar al servidor:", {
        idMantencion: mantencionSeleccionada.idMantencion,
        ...editarMantenimiento
    });
    try {
        const response = await axios.post('http://localhost/Tracelink/Mantenimiento/editar_mantencion.php', {
            idMantencion: mantencionSeleccionada.idMantencion,
            ...editarMantenimiento
        });
        console.log("Respuesta del servidor:", response.data); // Agrega esta línea para mostrar la respuesta del servidor en la consola
        if (response.data.message) {
            alert(response.data.message);
            cargarDatosMantencion();
            setShowModal(false);
        } else {
            console.error('Error al editar la mantención:', response.data.error);
            alert('Error al editar la mantención: ' + (response.data.error || 'Ocurrió un error desconocido'));
        }
    } catch (error) {
        console.error('Error al editar la mantención:', error);
        alert('Error al editar la mantención: ' + (error.message || 'Ocurrió un error desconocido'));
    }
};


    const handleDelete = async (mantencionId) => {
        console.log("ID de la mantención a eliminar:", mantencionId);
        axios.post(
            'http://localhost/Tracelink/Mantenimiento/eliminar_mantencion.php',
            { idMantencion: mantencionId }, // Verifica que mantencionId tenga el valor correcto
            { headers: { 'Content-Type': 'application/json' } }
        );
        try {
            const response = await axios.post(
                'http://localhost/Tracelink/Mantenimiento/eliminar_mantencion.php',
                { idMantencion: mantencionId }, // Verifica que mantencionId tenga el valor correcto
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log("Respuesta del servidor:", response.data);
            if (response.data.success) {
                alert('Mantención eliminada correctamente');
                cargarDatosMantencion(); // Actualizar la lista de mantenciones después de eliminar
            } else {
                alert('Error al eliminar la mantención: ' + response.data.error);
                console.error("Error detallado del servidor:", response.data.error);
            }
        } catch (error) {
            console.error('Error al eliminar la mantención:', error);
            alert('Error al eliminar la mantención: ' + (error.message || 'Ocurrió un error desconocido'));
        }
    };





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
                                <th>ID de Mantencion</th>
                                <th>Nombre del Mecánico</th>
                                <th>Hora</th>
                                <th>Fecha de Mantención</th>
                                <th>Descripción</th>
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
                                    <td>{mantencion.idMantencion}</td>
                                    <td>{mantencion.nombre_mecanico}</td>
                                    <td>{mantencion.hora}</td>
                                    <td>{mantencion.fecha}</td>
                                    <td>{mantencion.descripcion}</td>
                                    <td>{mantencion.marca}</td>
                                    <td>{mantencion.modelo}</td>
                                    <td>{mantencion.anio}</td>
                                    <td>{mantencion.transmision}</td>
                                    <td>{mantencion.patente}</td>
                                    <td>{mantencion.kilometrajeinicial}</td>
                                    <td>{mantencion.kilometrajeactual}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleModificar(mantencion.idMantencion)}>Modificar</Button>
                                        <Button variant="danger" onClick={() => handleDelete(mantencion.idMantencion)}>Eliminar</Button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </Table>


                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Mantención</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {mantencionSeleccionada && (
                                <Form onSubmit={handleSubmitEditar}>
                                    <Form.Group controlId="idCita">
                                        <Form.Label>Cita</Form.Label>
                                        <Form.Control as="select" name="idCita" value={editarMantenimiento.idCita} onChange={handleCitaChange}>
                                            <option value="">Seleccionar</option>
                                            {citas.map(cita => (
                                                <option key={cita.id} value={cita.id}>{cita.nombre_mecanico} - {cita.fecha}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="idVehiculo">
                                        <Form.Label>Vehículo</Form.Label>
                                        <Form.Control as="select" name="idVehiculo" disabled value={editarMantenimiento.idVehiculo} onChange={handleVehiculoChange}>
                                            <option value="">Seleccionar</option>
                                            {vehiculos.map(vehiculo => (
                                                <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.marca} {vehiculo.modelo}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="fecha">
                                        <Form.Label>Fecha</Form.Label>
                                        <Form.Control type="date" name="fecha" value={editarMantenimiento.fecha} onChange={e => setEditarMantenimiento({ ...editarMantenimiento, fecha: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group controlId="descripcion">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" name="descripcion" value={editarMantenimiento.descripcion} onChange={e => setEditarMantenimiento({ ...editarMantenimiento, descripcion: e.target.value })} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Guardar Cambios</Button>
                                </Form>
                            )}
                        </Modal.Body>
                    </Modal>

                </div>)}
        </div>);
} export default AgregarMantencion;

