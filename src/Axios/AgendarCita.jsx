import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Form, Button, Table } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Autocomplete, TextField } from '@mui/material';
import "../stylesheets/AgendarCita.css"

const AgregarCita = () => {
    const [formData, setFormData] = useState({
        nombre_mecanico: '',
        apellido_mecanico: '',
        fecha: '',
        hora: '',
        descripcion: ''
    });
    const [citas, setCitas] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);

    useEffect(() => {
        // Llamada inicial para obtener las citas existentes
        axios.get('http://localhost/Tracelink/cita/obtener_citas.php')
            .then(response => {
                setCitas(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las citas: ", error);
            });

        // Llamada inicial para obtener la lista de mecánicos
        axios.get('http://localhost/Tracelink/mecanicos/obtenerMecanicos.php')
            .then(response => {
                setMecanicos(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los mecánicos: ", error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de datos antes de enviar la solicitud
        if (!formData.nombre_mecanico || !formData.apellido_mecanico || !formData.fecha || !formData.hora || !formData.descripcion) {
            alert('Por favor complete todos los campos');
            return;
        }

        // Enviar la solicitud POST para agregar una nueva cita
        axios.post('http://localhost/Tracelink/cita/agregar_cita.php', formData)
            .then(response => {
                setCitas([...citas, response.data]);
                setFormData({
                    nombre_mecanico: '',
                    apellido_mecanico: '',
                    fecha: '',
                    hora: '',
                    descripcion: ''
                });
            })
            .catch(error => {
                console.error("Hubo un error al agregar la cita: ", error);
            });
    };

    const handleMecanicoChange = (event, newValue) => {
        setFormData({
            ...formData,
            nombre_mecanico: newValue ? newValue.nombre : '',
            apellido_mecanico: newValue ? newValue.apellido : ''
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
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
                </Form>
            </div>
        </div>
    );
};

export default AgregarCita;
