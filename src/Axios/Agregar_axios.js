import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from './axiosConfig';
import Navbar from '../components/Navbar';
import '../stylesheets/AgregarVehiculo.css';

// Componente para agregar un vehículo
const AgregarVehiculo = ({ onAgregar }) => {
    // Definición de estados utilizando useState
    const [show, setShow] = useState(false); // Estado para controlar la visibilidad del modal
    const [marca, setMarca] = useState(''); // Estado para la marca del vehículo
    const [modelo, setModelo] = useState(''); // Estado para el modelo del vehículo
    const [anio, setAnio] = useState(''); // Estado para el año del vehículo
    const [transmision, setTransmision] = useState(''); // Estado para la transmisión del vehículo
    const [patente, setPatente] = useState(''); // Estado para la patente del vehículo
    const [kilometrajeinicial, setKilometrajeinicial] = useState(''); // Estado para el kilometraje inicial del vehículo
    const [kilometrajeactual, setKilometrajeactual] = useState(''); // Estado para el kilometraje actual del vehículo
    const [error, setError] = useState(null); // Estado para manejar errores
    const [marcas, setMarcas] = useState([]); // Estado para almacenar las marcas obtenidas de la API
    const [modelos, setModelos] = useState([]); // Estado para almacenar los modelos obtenidos de la API

    // Función para cerrar el modal
    const handleClose = () => setShow(false);

    // Función para mostrar el modal
    const handleShow = () => setShow(true);

    // useEffect para obtener las marcas al montar el componente
    useEffect(() => {
        fetchMarcas();
    }, []);

    // useEffect para obtener los modelos cada vez que se cambia la marca
    useEffect(() => {
        if (marca) {
            fetchModelos(marca);
        }
    }, [marca]);

    // Función para obtener las marcas desde la API
    const fetchMarcas = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/vehiculo/obtener_marcas.php');
            setMarcas(response.data);
        } catch (error) {
            console.error('Error al obtener marcas:', error);
        }
    };

    // Función para obtener los modelos según la marca seleccionada desde la API
    const fetchModelos = async (marcaId) => {
        try {
            const response = await axios.get(`http://localhost/Tracelink/vehiculo/obtener_modelos.php?marca=${marcaId}`);
            setModelos(response.data);
        } catch (error) {
            console.error('Error al obtener modelos:', error);
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que todos los campos estén llenos
        if (!marca || !modelo || !anio || !transmision || !patente || !kilometrajeinicial || !kilometrajeactual) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Log de los datos que se enviarán al servidor
        console.log('Datos que se enviarán al servidor:', {
            marca,
            modelo,
            anio,
            transmision,
            patente,
            kilometrajeinicial,
            kilometrajeactual
        });

        // Envío de datos al servidor
        try {
            const response = await axios.post('http://localhost/Tracelink/vehiculo/agregar_vehiculo.php', {
                marca,
                modelo,
                anio,
                transmision,
                patente,
                kilometrajeinicial,
                kilometrajeactual
            });

            // Log de la respuesta del servidor
            console.log('Respuesta del servidor:', response.data);

            // Manejo de la respuesta del servidor
            if (response.data && response.data.success) {
                setError(response.data.error);
                if (typeof onAgregar === 'function') {
                    onAgregar(response.data);
                }
                // Resetear los campos del formulario
                setMarca('');
                setModelo('');
                setAnio('');
                setTransmision('');
                setPatente('');
                setKilometrajeinicial('');
                setKilometrajeactual('');
                setError(null);
                handleClose();
            } else {
                setError('Error al agregar vehículo: ' + (response.data.error || 'Unknown error'));
            }
        } catch (error) {
            setError('Error al agregar vehículo: ' + error.message);
            console.error('Error al agregar vehículo:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
            </div>
            <Modal show={true} onHide={handleClose}>
                <Modal.Body>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formMarca">
                            <Form.Label>Marca:</Form.Label>
                            <Form.Control as="select" value={marca} onChange={(e) => setMarca(e.target.value)} required>
                                <option value="">Seleccionar</option>
                                {Array.isArray(marcas) && marcas.map(marca => (
                                    <option key={marca.idMarca} value={marca.Nombre_marca}>{marca.Nombre_marca}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formModelo">
                            <Form.Label>Modelo:</Form.Label>
                            <Form.Control as="select" onChange={(e) => setModelo(e.target.value)} value={modelo} disabled={!marca} required>
                                <option value="">Seleccionar</option>
                                {Array.isArray(modelos) && modelos.map((modelo, index) => (
                                    <option key={index} value={modelo}>{modelo}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formAnio">
                            <Form.Label>Año:</Form.Label>
                            <Form.Control type="number" value={anio} onChange={(e) => setAnio(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formTransmision">
                            <Form.Label>Transmisión:</Form.Label>
                            <Form.Control as="select" value={transmision} onChange={(e) => setTransmision(e.target.value)} required>
                                <option value="">Seleccionar</option>
                                <option value="Automatico">Automático</option>
                                <option value="Manual">Manual</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPatente">
                            <Form.Label>Patente:</Form.Label>
                            <Form.Control type="text" value={patente} onChange={(e) => setPatente(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formKilometrajeinicial">
                            <Form.Label>Kilometraje Inicial:</Form.Label>
                            <Form.Control type="text" value={kilometrajeinicial} onChange={(e) => setKilometrajeinicial(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId="formKilometrajeactual">
                            <Form.Label>Kilometraje Actual:</Form.Label>
                            <Form.Control type="text" value={kilometrajeactual} onChange={(e) => setKilometrajeactual(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AgregarVehiculo;
