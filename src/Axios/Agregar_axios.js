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
    const [kilometrajeinicial, setKilometrajeinicial] = useState('');
    const [kilometrajeactual, setKilometrajeactual] = useState('');
    const [patente, setPatente] = useState('');
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        const response = await axios.post('/agregar_vehiculo.php', {
            marca,
            modelo,
            anio,
            transmision,
            patente , 
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
            setKilometrajeinicial('');
            setKilometrajeactual('');
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
                        required>
                        <option value="">Seleccione una Transmision </option>
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
                        required/>
                </Form.Group>
                <Form.Group controlId="formKminicial">
                    <Form.Label>Kilometraje inicial:</Form.Label>
                    <Form.Control
                        type="text"
                        value={kilometrajeinicial}
                        onChange={(e) => setKilometrajeinicial(e.target.value)}
                        required/>
                </Form.Group>

                <Form.Group controlId="formKMactual">
                    <Form.Label>Kilometraje Actual:</Form.Label>
                    <Form.Control
                        type="text"
                        value={kilometrajeactual}
                        onChange={(e) => setKilometrajeactual(e.target.value)}
                        required/>
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