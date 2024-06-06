import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Form, Button, Table } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const AgregarMantenimiento = () => {
    const [citas, setCitas] = useState([]);
    const [mantenimientos, setMantenimientos] = useState([]);
    const [selectedCitaId, setSelectedCitaId] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {''
        fetchCitas();
        fetchMantenimientos();
    }, []);

    const fetchCitas = async () => {
        try {
            const response = await axios.get('obtener_citas.php');
            setCitas(response.data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
            setError('Error al obtener citas');
        }
    };

    const fetchMantenimientos = async () => {
        try {
            const response = await axios.get('agregar_mantenimiento.php'); // Usar el endpoint correcto
            console.log(response.data); // Agregar este console.log para verificar la respuesta
            setMantenimientos(response.data);
        } catch (error) {
            console.error('Error al obtener mantenimientos:', error);
            setError('Error al obtener mantenimientos');
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCitaId || !descripcion || !fecha) {
            setError('Por favor, selecciona una cita, escribe una descripción y selecciona una fecha.');
            return;
        }

        try {
            const response = await axios.post('agregar_mantenimiento.php', {
                idMantencion: selectedCitaId, // Id mantención es el mismo que citas_idcitas
                citas_idcitas: selectedCitaId,
                fecha,
                descripcion
            });

            if (response.data.success) {
                fetchMantenimientos();
                setMensaje('Datos insertados correctamente.');
                setError(null);
                setSelectedCitaId('');
                setDescripcion('');
                setFecha('');
            } else {
                setError(response.data.error || 'Error desconocido');
            }
        } catch (error) {
            setError('Error al agregar mantenimiento: ' + error.message);
            console.error('Error al agregar mantenimiento:', error);
        }
    };

    const handleEdit = (mantenimiento) => {
        setSelectedCitaId(mantenimiento.citas_idcitas);
        setDescripcion(mantenimiento.descripcion);
        setFecha(mantenimiento.fecha);
    };

    const handleDelete = async (mantenimientoId) => {
        try {
            const response = await axios.post('eliminar_mantenimiento.php', {
                idMantencion: mantenimientoId
            });

            if (response.data.success) {
                fetchMantenimientos();
                setError(null);
            } else {
                setError(response.data.error || 'Error desconocido');
            }
        } catch (error) {
            setError('Error al eliminar mantenimiento: ' + error.message);
            console.error('Error al eliminar mantenimiento:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCitaId">
                    <Form.Label>Cita ID</Form.Label>
                    <Form.Control as="select" value={selectedCitaId} onChange={e => setSelectedCitaId(e.target.value)}>
                        <option value="">Seleccione una cita</option>
                        {citas.map(cita => (
                            <option key={cita.id} value={cita.id}>{cita.nombre}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formFecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agregar Mantenimiento
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cita ID</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mantenimientos.map((mantenimiento) => (
                        <tr key={mantenimiento.idMantencion}>
                            <td>{mantenimiento.idMantencion}</td>
                            <td>{mantenimiento.citas_idcitas}</td>
                            <td>{mantenimiento.fecha}</td>
                            <td>{mantenimiento.descripcion}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEdit(mantenimiento)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(mantenimiento.idMantencion)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {error && <p className="text-danger">{error}</p>}
            {mensaje && <p className="text-success">{mensaje}</p>}
        </>
    );
};

export default AgregarMantenimiento;
