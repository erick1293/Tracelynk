import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Autocomplete, TextField } from '@mui/material';
import "../stylesheets/AgendarCita.css";

const AgregarCita = () => {
    const [formData, setFormData] = useState({
        nombre_mecanico: '',
        mecanico_id: '',
        fecha: '',
        hora: '',
        descripcion: '',
        vehiculos: []
    });
    const [citas, setCitas] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Obtener mecánicos
        axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mecanicos/obtenerMecanicos.php')
            .then(response => setMecanicos(response.data))
            .catch(error => console.error("Hubo un error al obtener los mecánicos: ", error));

        // Obtener vehículos
        axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/Vehiculos.php')
            .then(response => setVehiculos(response.data))
            .catch(error => {
                console.error('Error al obtener los datos de vehículos:', error);
                setError('Error al obtener los datos de vehículos.');
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleMecanicoChange = (event, newValue) => {
        if (newValue) {
            setFormData({
                ...formData,
                nombre_mecanico: `${newValue.nombre} ${newValue.apellido}`,
                mecanico_id: newValue.idMecanico
            });
        } else {
            setFormData({
                ...formData,
                nombre_mecanico: '',
                mecanico_id: ''
            });
        }
    };

    const handleVehiculoChange = (e) => {
        const idVehiculo = e.target.value;
        const vehiculoSeleccionado = vehiculos.find(vehiculo => vehiculo.id === idVehiculo);
        if (vehiculoSeleccionado) {
            setFormData(prevState => ({
                ...prevState,
                vehiculos: [...prevState.vehiculos, vehiculoSeleccionado.id]
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nombre_mecanico || !formData.mecanico_id || !formData.fecha || !formData.hora || !formData.descripcion || formData.vehiculos.length === 0) {
            alert('Por favor complete todos los campos');
            return;
        }

        axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/cita/agregar_cita.php', formData)
            .then(response => {
                setCitas([...citas, response.data]);
                setFormData({
                    nombre_mecanico: '',
                    mecanico_id: '',
                    fecha: '',
                    hora: '',
                    descripcion: '',
                    vehiculos: []
                });
                setShowAlert(true); // Mostrar alerta
                setTimeout(() => setShowAlert(false), 3000); // Ocultar alerta después de 3 segundos
            })
            .catch(error => console.error("Hubo un error al agregar la cita: ", error));
    };

    const redireccionarMostrarCitas = () => {
        window.location.href = '/EditarCita';
    };

    return (
        <div>
            <div className="container mt-4">
                {showAlert && <Alert variant="success">Cita agregada correctamente!</Alert>}
                <Form onSubmit={handleSubmit}>
                    <h2>Agregar Nueva Cita</h2>
                    <Form.Group controlId="formNombreMecanico">
                        <Form.Label>Nombre del Mecánico</Form.Label>
                        <Autocomplete
                            options={mecanicos}
                            getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
                            onChange={handleMecanicoChange}
                            renderInput={(params) => <TextField {...params} placeholder="Seleccione el nombre del mecánico" />}
                        />
                    </Form.Group>
                        <Form.Group controlId="idVehiculo">
                            <Form.Label>Vehículo</Form.Label>
                            <Form.Control as="select" onChange={handleVehiculoChange}>
                                <option value="">Seleccione un vehículo</option>
                                {vehiculos.map(vehiculo => (
                                    <option key={vehiculo.id} value={vehiculo.id}>
                                        {vehiculo.marca} {vehiculo.modelo} {vehiculo.patente} {vehiculo.anio}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    <Form.Group controlId="formFecha">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formHora">
                        <Form.Label>Hora</Form.Label>
                        <Form.Control
                            type="time"
                            name="hora"
                            value={formData.hora}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Ingrese la descripción"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Agregar Cita
                    </Button>
                    <Button variant="secondary" onClick={redireccionarMostrarCitas} className="ml-2">
                        Mostrar Citas
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AgregarCita;
