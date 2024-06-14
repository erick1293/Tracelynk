import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Form, Button, Table } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Autocomplete, TextField } from '@mui/material';
import "../stylesheets/AgendarCita.css"

const AgregarCita = () => {
    const [formData, setFormData] = useState({
        nombre_mecanico: '',
        mecanico_id: '', // Nuevo campo para almacenar el ID del mecánico
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
    const handleMecanicoChange = (event, newValue) => {
        if (newValue) {
            console.log("Mecánico seleccionado:", newValue);
            setFormData({
                ...formData,
                nombre_mecanico: `${newValue.nombre} ${newValue.apellido}`,
                mecanico_id: newValue.idMecanico  // Usar idMecanico en lugar de id
            });
        } else {
            console.log("Mecánico deseleccionado");
            setFormData({
                ...formData,
                nombre_mecanico: '',
                mecanico_id: ''
            });
        }
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validación de datos antes de enviar la solicitud
        console.log("Datos a enviar:", formData); // Agregar este console log
    
        if (!formData.nombre_mecanico || !formData.mecanico_id || !formData.fecha || !formData.hora || !formData.descripcion) {
            alert('Por favor complete todos los campos');
            return;
        }
    
        // Enviar la solicitud POST para agregar una nueva cita
        axios.post('http://localhost/Tracelink/cita/agregar_cita.php', formData)
            .then(response => {
                setCitas([...citas, response.data]);
                setFormData({
                    nombre_mecanico: '',
                    mecanico_id: '',
                    fecha: '',
                    hora: '',
                    descripcion: ''
                });
            })
            .catch(error => {
                console.error("Hubo un error al agregar la cita: ", error);
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
