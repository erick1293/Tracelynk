import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const Citas = () => {
    const [citas, setCitas] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [editando, setEditando] = useState(false);
    const [nuevaCita, setNuevaCita] = useState({
        id: '',
        nombre_mecanico: '',
        fecha: '',
        hora: '',
        descripcion: ''
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/cita/obtener_citas.php');
            setCitas(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const handleDelete = async (citaId) => {
        try {
            const response = await axios.post('http://localhost/Tracelink/cita/eliminarCita.php', { id: citaId });
            alert(response.data.message); // Mostrar mensaje de éxito o error
            // Actualizar la lista de citas después de eliminar
            fetchData();
        } catch (error) {
            console.error('Error al eliminar cita:', error);
            alert('Error al eliminar cita: ' + error.message);
        }
    };

    const handleModificar = (citaId) => {
        const cita = citas.find(c => c.id === citaId);
        if (cita) {
            setCitaSeleccionada(cita);
            setNuevaCita({
                id: cita.id,
                nombre_mecanico: cita.nombre_mecanico,
                fecha: cita.fecha,
                hora: cita.hora,
                descripcion: cita.descripcion
            });
            setEditando(true);
            setShowModal(true);
        } else {
            console.error('Cita no encontrada:', citaId);
        }
    };

    const handleEditar = (e) => {
        const { name, value } = e.target;
        setNuevaCita(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/Tracelink/cita/editarCita.php', nuevaCita);
            alert(response.data.message); // Mostrar mensaje de éxito o error
            fetchData();
            setEditando(false);
            setShowModal(false);
            setCitaSeleccionada(null);
            setNuevaCita({
                id: '',
                nombre_mecanico: '',
                fecha: '',
                hora: '',
                descripcion: ''
            });
        } catch (error) {
            console.error('Error al editar cita:', error);
            alert('Error al editar cita: ' + error.message);
        }
    };

    const handleBuscar = (e) => {
        setFiltro(e.target.value);
    };

    const citasFiltradas = citas.filter(c => {
        return c.nombre_mecanico.toLowerCase().includes(filtro.toLowerCase()) ||
            c.fecha.toLowerCase().includes(filtro.toLowerCase()) ||
            c.hora.toLowerCase().includes(filtro.toLowerCase()) ||
            c.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
            c.id.toString().toLowerCase().includes(filtro.toLowerCase());
    });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Navbar />
            <h1>Citas</h1>
            <Form.Control type="text" placeholder="Buscar..." className="mb-3" onChange={handleBuscar} />
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Mecánico</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citasFiltradas.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nombre_mecanico}</td>
                            <td>{c.fecha}</td>
                            <td>{c.hora}</td>
                            <td>{c.descripcion}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleModificar(c.id)}>Modificar</Button>
                                <Button variant="danger" onClick={() => handleDelete(c.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar Cita' : 'Nueva Cita'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombreMecanico">
                            <Form.Label>Nombre del Mecánico</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre_mecanico"
                                value={nuevaCita.nombre_mecanico}
                                onChange={handleEditar}
                                placeholder="Ingrese el nombre del mecánico"
                            />
                        </Form.Group>

                        <Form.Group controlId="formFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                value={nuevaCita.fecha}
                                onChange={handleEditar}
                            />
                        </Form.Group>

                        <Form.Group controlId="formHora">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="hora"
                                value={nuevaCita.hora}
                                onChange={handleEditar}
                            />
                        </Form.Group>


                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={nuevaCita.descripcion}
                                onChange={handleEditar}
                                placeholder="Ingrese la descripción"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editando ? 'Guardar cambios' : 'Agregar Cita'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Citas;
