import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { Form, Button, Table } from 'react-bootstrap';
import Navbar from '../components/Navbar';



const AgregarMantenimiento = () => {
    const [citas, setCitas] = useState([]);
    const [mantenimientos, setMantenimientos] = useState([]);
    const [selectedCitaId, setSelectedCitaId] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCitas();
        fetchMantenimientos();
    }, []);

    const fetchCitas = async () => {
        try {
            const response = await axios.get('obtener_citas.php');
            setCitas(response.data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

    const fetchMantenimientos = async () => {
        try {
            const response = await axios.get('obtener_mantenimientos.php');
            setMantenimientos(response.data);
        } catch (error) {
            console.error('Error al obtener mantenimientos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCitaId || !descripcion) {
            setError('Por favor, selecciona una cita y escribe una descripción.');
            return;
        }

        try {
            const response = await axios.post('agregar_mantenimiento.php', {
                cita_id: selectedCitaId,
                descripcion
            });

            if (response.data.success) {
                fetchMantenimientos();
                setError('');
            } else {
                setError('Error al agregar mantenimiento: ' + (response.data.error || 'Error desconocido'));
            }
        } catch (error) {
            setError('Error al agregar mantenimiento: ' + error.message);
            console.error('Error al agregar mantenimiento:', error);
        }
    };

    const handleEdit = (mantenimiento) => {
        setSelectedCitaId(mantenimiento.cita_id);
        setDescripcion(mantenimiento.descripcion);
        // Aquí deberías abrir un modal o un formulario de edición
    };

    const handleDelete = async (mantenimientoId) => {
        try {
            const response = await axios.post('eliminar_mantenimiento.php', {
                id: mantenimientoId
            });

            if (response.data.success) {
                fetchMantenimientos();
            } else {
                setError('Error al eliminar mantenimiento: ' + (response.data.error || 'Error desconocido'));
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
                {/* ...tu código del formulario... */}
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cita ID</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mantenimientos.map((mantenimiento) => (
                        <tr key={mantenimiento.id}>
                            <td>{mantenimiento.id}</td>
                            <td>{mantenimiento.cita_id}</td>
                            <td>{mantenimiento.descripcion}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEdit(mantenimiento)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(mantenimiento.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {error && <p className="text-danger">{error}</p>}
        </>
    );
};

export default AgregarMantenimiento;
