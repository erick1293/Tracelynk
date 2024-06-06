
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from './axiosConfig';
import Navbar from '../components/Navbar';
import '../stylesheets/AgregarVehiculo.css';

const AgregarVehiculo = ({ onAgregar }) => {
    const [show, setShow] = useState(false);
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState('');
    const [transmision, setTransmision] = useState('');
    const [patente, setPatente] = useState('');
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!marca || !modelo || !anio || !transmision || !patente) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        console.log('Datos que se enviarán al servidor:', {
            marca,
            modelo,
            anio,
            transmision,
            patente
        });

        const response = await axios.post('/agregar_vehiculo.php', {
            marca,
            modelo,
            anio,
            transmision,
            patente
        });
        try {
            const response = await axios.post('/agregar_vehiculo.php', {
                marca,
                modelo,
                anio,
                transmision,
                patente
            });

            // Verificar si onAgregar es una función antes de llamarla
            if (typeof onAgregar === 'function') {
                onAgregar(response.data);
            }

            // Limpiar el formulario y los errores después de agregar el vehículo
            setMarca('');
            setModelo('');
            setAnio('');
            setTransmision('');
            setPatente('');
            setError(null);
            handleClose();
        } catch (error) {
            setError('Error al agregar vehículo: ' + error.message);
            console.error('Error al agregar vehículo:', error);
        }
    };

    return (// Cambiar el "Button" de  <Modal show={Button} onHide={handleClose}> "  por Show par ocultar el modal"
    <>
    <Navbar />
   { //* <div className="container">
        //* <Button variant="success" onClick={handleShow} className="mt-3">
           //* Agregar Vehículo
        //* </Button> 
        //*    </div>
    }
    <Modal show={Button} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Agregar Vehículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMarca">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formModelo">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAnio">
                    <Form.Label>Año:</Form.Label>
                    <Form.Control
                        type="number"
                        value={anio}
                        onChange={(e) => setAnio(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formTransmision">
                    <Form.Label>Transmisión:</Form.Label>
                    <Form.Control
                        as="select"
                        value={transmision}
                        onChange={(e) => setTransmision(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar</option>
                        <option value="Automático">Automático</option>
                        <option value="Manual">Manual</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPatente">
                    <Form.Label>Patente:</Form.Label>
                    <Form.Control
                        type="text"
                        value={patente}
                        onChange={(e) => setPatente(e.target.value)}
                        required
                    />
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
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from './axiosConfig';
import Navbar from '../components/Navbar';
import '../stylesheets/AgregarVehiculo.css';

const AgregarVehiculo = ({ onAgregar }) => {
    const [show, setShow] = useState(false);
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState('');
    const [transmision, setTransmision] = useState('');
    const [patente, setPatente] = useState('');
    const [kilometrajeinicial, setKilometrajeinicial] = useState('');
    const [kilometrajeactual, setKilometrajeactual] = useState('');
    const [error, setError] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchMarcas();
    }, []);

    useEffect(() => {
        if (marca) {
            fetchModelos(marca);
        }
    }, [marca]);

    const fetchMarcas = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/obtener_marcas.php');
            setMarcas(response.data);
        } catch (error) {
            console.error('Error al obtener marcas:', error);
        }
    };

    const fetchModelos = async (marcaId) => {
        try {
            const response = await axios.get(`http://localhost/Tracelink/obtener_modelos.php?marca=${marcaId}`);
            setModelos(response.data);
        } catch (error) {
            console.error('Error al obtener modelos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!marca || !modelo || !anio || !transmision || !patente || !kilometrajeinicial || !kilometrajeactual) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        console.log('Datos que se enviarán al servidor:', {
            marca,
            modelo,
            anio,
            transmision,
            patente,
            kilometrajeinicial,
            kilometrajeactual
        });

        try {
            const response = await axios.post('/agregar_vehiculo.php', {
                marca,
                modelo,
                anio,
                transmision,
                patente,
                kilometrajeinicial,
                kilometrajeactual
            });

            console.log('Respuesta del servidor:', response.data);

            if (response.data && response.data.success) {
                if (typeof onAgregar === 'function') {
                    onAgregar(response.data);
                }

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

