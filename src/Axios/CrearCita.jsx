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
        apellido_mecanico: '',
        fecha: '',
        hora: '',
        descripcion: '',
        patente: '' // Nuevo estado para la patente del vehículo
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/cita/obtener_citas.php');
            setCitas(response.data); // Asumiendo que el formato del JSON coincide con la estructura de citas esperada
        } catch (error) {
            setError(error);
        }
    };

    const handleDelete = async (citaId) => {
        try {
            const response = await axios.post('http://localhost/Tracelink/cita/eliminarCita.php', { id: citaId });
            alert(response.data.message); // Mostrar mensaje de éxito o error
            fetchData(); // Actualizar la lista de citas después de eliminar
        } catch (error) {
            console.error('Error al eliminar cita:', error);
            alert('Error al eliminar cita: ' + error.message);
        }
    };
    const handleModificar = (citaId) => {
        console.log("Intentando modificar cita con ID:", citaId);
        const cita = citas.find(c => c.cita_id === citaId);
        if (cita) {
            console.log("Cita encontrada:", cita);
            setCitaSeleccionada(cita);
            setNuevaCita({
                id: cita.cita_id, // Usar cita.cita_id para asegurar la comparación correcta
                nombre_mecanico: cita.nombre_mecanico,
                apellido_mecanico: cita.apellido_mecanico,
                fecha: cita.fecha,
                hora: cita.hora,
                descripcion: cita.descripcion,
                patente: cita.patente
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
        console.log('Intentando modificar cita con ID:', nuevaCita.id);
        console.log('Datos a enviar:', nuevaCita); // Verifica los datos antes de enviar
    
        try {
            // Asegúrate de convertir el id a número si es necesario
            const idCita = parseInt(nuevaCita.id);
    
            const response = await axios.post('http://localhost/Tracelink/cita/editarCita.php', {
                id: idCita,
                nombre_mecanico: nuevaCita.nombre_mecanico,
                apellido_mecanico: nuevaCita.apellido_mecanico,
                fecha: nuevaCita.fecha,
                hora: nuevaCita.hora,
                descripcion: nuevaCita.descripcion,
                patente: nuevaCita.patente
            });
            alert(response.data.message); // Mostrar mensaje de éxito o error
            fetchData(); // Actualizar la lista de citas después de editar
            setEditando(false);
            setShowModal(false);
            setCitaSeleccionada(null);
            setNuevaCita({
                id: '',
                nombre_mecanico: '',
                apellido_mecanico: '',
                fecha: '',
                hora: '',
                descripcion: '',
                patente: ''
            });
        } catch (error) {
            console.error('Error al editar cita:', error);
            alert('Error al editar cita: ' + error.message);
        }
    };
    
    
    

    const handleBuscar = (e) => {
        setFiltro(e.target.value);
    };

    const citasFiltradas = Array.isArray(citas) ? citas.filter(c => {
        return c.nombre_mecanico.toLowerCase().includes(filtro.toLowerCase()) ||
            c.apellido_mecanico.toLowerCase().includes(filtro.toLowerCase()) ||
            c.fecha.toLowerCase().includes(filtro.toLowerCase()) ||
            c.hora.toLowerCase().includes(filtro.toLowerCase()) ||
            c.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
            c.id.toString().toLowerCase().includes(filtro.toLowerCase());
    }) : [];
    

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
                        <th>Apellido del Mecánico</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Descripción</th>
                        <th>Patente del Vehículo</th> {/* Nueva columna para mostrar la patente */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    {citasFiltradas.map(c => (
        <tr key={c.idCitas}>
            <td>{c.cita_id}</td> {/* Display the correct ID from citas table */}
            <td>{c.nombre_mecanico}</td>
            <td>{c.apellido_mecanico}</td>
            <td>{c.fecha}</td>
            <td>{c.hora}</td>
            <td>{c.descripcion}</td>
            <td>{c.patente}</td>
            <td>
                <Button variant="primary" onClick={() => handleModificar(c.cita_id)}>Modificar</Button>
                <Button variant="danger" onClick={() => handleDelete(c.cita_id)}>Eliminar</Button>
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
                                type="text" disabled
                                name="nombre_mecanico"
                                value={nuevaCita.nombre_mecanico}
                                onChange={handleEditar}
                                placeholder="Ingrese el nombre del mecánico"
                            />
                        </Form.Group>

                        <Form.Group controlId="formApellidoMecanico">
                            <Form.Label>Apellido del Mecánico</Form.Label>
                            <Form.Control
                                type="text"disabled
                                name="apellido_mecanico"
                                value={nuevaCita.apellido_mecanico}
                                onChange={handleEditar}
                                placeholder="Ingrese el apellido del mecánico"
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
