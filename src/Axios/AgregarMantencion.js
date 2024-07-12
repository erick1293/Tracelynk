import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AgregarMantencion() {
    const [datosMantencion, setDatosMantencion] = useState([]);
    const [citasDisponibles, setCitasDisponibles] = useState([]);
    const [citas, setCitas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        idCita: '',
        vehiculo_id: '',
        fecha: '',
        descripcion: ''
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [mantencionSeleccionada, setMantencionSeleccionada] = useState(null);
    const [editarMantenimiento, setEditarMantenimiento] = useState({
        idCita: '',
        vehiculo_id: '',
        fecha: '',
        descripcion: ''
    });

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            await cargarMecanicos();
            await cargarDatosMantencion();
            await cargarCitas();
            await cargarVehiculos();
        };
        cargarDatosIniciales();
    }, []);

    const cargarDatosMantencion = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/Mantenimiento/dato.php');
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setDatosMantencion(response.data.mantenciones);
        } catch (error) {
            console.error('Error al obtener los datos de mantención:', error);
            setError('Error al obtener los datos de mantención: ' + error.message);
        }
    };

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

    const cargarMecanicos = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/Mantenimiento/obtenerMecanicos.php');
            setMecanicos(response.data);
        } catch (error) {
            console.error('Error al obtener los datos de mecánicos:', error);
            setError('Error al obtener los datos de mecánicos.');
        }
    };

    const handleCitaChange = (e) => {
        const idCita = e.target.value;
        const citaSeleccionada = citas.find(cita => cita.id === idCita);
        if (citaSeleccionada) {
            setNuevoMantenimiento(prevState => ({
                ...prevState,
                idCita: citaSeleccionada.id,
                vehiculo_id: citaSeleccionada.vehiculo_id
            }));
        }
    };

    const handleModificar = (idMantencion) => {
        const mantencion = datosMantencion.find(m => m.idMantencion === idMantencion);
        if (mantencion) {
            setMantencionSeleccionada(mantencion);
            setEditarMantenimiento({
                idCita: mantencion.cita_id,
                vehiculo_id: mantencion.vehiculo_id,
                fecha: mantencion.fecha,
                descripcion: mantencion.descripcion
            });
            setShowModal(true);
        } else {
            console.error('Mantención no encontrada con el ID:', idMantencion);
        }
    };

    const handleSubmitEditar = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/Tracelink/Mantenimiento/editar_mantencion.php', {
                idMantencion: mantencionSeleccionada.idMantencion,
                ...editarMantenimiento
            });
            if (response.data.message) {
                alert(response.data.message);
                cargarDatosMantencion();
                handleCloseModal();
            } else {
                alert('Error al editar la mantención: ' + (response.data.error || 'Ocurrió un error desconocido'));
            }
        } catch (error) {
            alert('Error al editar la mantención: ' + (error.message || 'Ocurrió un error desconocido'));
        }
    };

    const handleDelete = async (mantencionId) => {
        try {
            const response = await axios.post(
                'http://localhost/Tracelink/Mantenimiento/eliminar_mantencion.php',
                { idMantencion: mantencionId },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                alert('Mantención eliminada correctamente');
                cargarDatosMantencion();
            } else {
                alert('Error al eliminar la mantención: ' + response.data.error);
            }
        } catch (error) {
            alert('Error al eliminar la mantención: ' + (error.message || 'Ocurrió un error desconocido'));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoMantenimiento({ ...nuevoMantenimiento, [name]: value });

        if (name === 'fecha') {
            cargarCitasDisponibles(nuevoMantenimiento.idCita, value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(nuevoMantenimiento);
        const fechaDisponible = verificarFechaDisponible(nuevoMantenimiento.fecha);
        const mecanicoDisponible = verificarMecanicoDisponible(nuevoMantenimiento.idCita, nuevoMantenimiento.fecha);

        if (fechaDisponible && mecanicoDisponible) {
            try {
                await axios.post('http://localhost/Tracelink/Mantenimiento/AgregarMantencion.php', nuevoMantenimiento);
                limpiarFormulario();
                cargarDatosMantencion();
            } catch (error) {
                setError('Error al agregar la mantención.');
            }
        } else {
            alert('La fecha y/o el mecánico seleccionado no están disponibles. Por favor, elija otra fecha/mecánico.');
        }
    };

    const limpiarFormulario = () => {
        setNuevoMantenimiento({
            idCita: '',
            fecha: '',
            descripcion: ''
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditarMantenimiento({
            idCita: '',
            fecha: '',
            descripcion: ''
        });
        setMantencionSeleccionada(null);
    };

    const verificarMecanicoDisponible = (idCita, fecha) => {
        const citaExistente = citas.find(cita => cita.id === idCita && cita.fecha === fecha);
        return !citaExistente;
    };

    const verificarFechaDisponible = (fecha) => {
        const citaExistente = citas.find(cita => cita.fecha === fecha);
        return !citaExistente;
    };

    const cargarCitasDisponibles = async (idCita, fecha) => {
        try {
            const response = await axios.get(`http://localhost/Tracelink/Mantenimiento/obtener_citas.php?idCita=${idCita}&fecha`);
            setCitasDisponibles(response.data);
        } catch (error) {
            console.error('Error al obtener las citas disponibles:', error);
        }
    };

    const descargarPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['ID', 'Fecha', 'Descripción', 'Patente Vehículo']],
            body: datosMantencion.map(mantencion => [
                mantencion.idMantencion,
                mantencion.fecha,
                mantencion.descripcion,
                mantencion.patente
            ])
        });
        doc.save('lista_mantenciones.pdf');
    };

    return (
        <div>
            <h2>Agregar Mantención</h2>
            {error && <p>Error: {error}</p>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="idCita">
                    <Form.Label>ID de la Cita</Form.Label>
                    <Form.Control as="select" value={nuevoMantenimiento.idCita} onChange={handleCitaChange}>
                        <option value="">Seleccione una cita</option>
                        {citas.map(cita => (
                            <option key={cita.id} value={cita.id}>
                                {cita.fecha} - {cita.descripcion} - {cita.patente} ({cita.marca} {cita.modelo})
                            </option>
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

                <Button variant="primary" type="submit">
                    Agregar Mantención
                </Button>
            </Form>

            <h2>Lista de Mantenciones</h2>
            <Button variant="secondary" onClick={descargarPDF}>Descargar PDF</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Patente vehiculo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datosMantencion.map((mantencion) => (
                        <tr key={mantencion.idMantencion}>
                            <td>{mantencion.idMantencion}</td>
                            <td>{mantencion.fecha}</td>
                            <td>{mantencion.descripcion}</td>
                            <td>{mantencion.patente}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleModificar(mantencion.idMantencion)}>Modificar</Button>
                                <Button variant="danger" onClick={() => handleDelete(mantencion.idMantencion)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Mantención</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEditar}>
                        <Form.Group controlId="idCitaEditar">
                            <Form.Label>ID de la Cita</Form.Label>
                            <Form.Control as="select" value={editarMantenimiento.idCita} onChange={(e) => setEditarMantenimiento({ ...editarMantenimiento, idCita: e.target.value })}>
                                <option value="">Seleccione una cita</option>
                                {citas.map(cita => (
                                    <option key={cita.id} value={cita.id}>
                                        {cita.fecha} - {cita.descripcion} - {cita.patente} ({cita.marca} {cita.modelo})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="fechaEditar">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" name="fecha" value={editarMantenimiento.fecha} onChange={(e) => setEditarMantenimiento({ ...editarMantenimiento, fecha: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="descripcionEditar">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" name="descripcion" value={editarMantenimiento.descripcion} onChange={(e) => setEditarMantenimiento({ ...editarMantenimiento, descripcion: e.target.value })} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default AgregarMantencion;

