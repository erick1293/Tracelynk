import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Form, Button, Table } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const AgregarCita = () => {
    const [formData, setFormData] = useState({
        nombre_mecanico: '',
        fecha: '',
        hora: '',
        descripcion: ''
    });
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        // Llamada inicial para obtener las citas existentes
        axios.get('http://localhost/Tracelink/cita/obtener_citas.php')
            .then(response => {
                setCitas(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las citas: ", error);
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
        if (!formData.nombre_mecanico || !formData.fecha || !formData.hora || !formData.descripcion) {
            alert('Por favor complete todos los campos');
            return;
        }

        // Enviar la solicitud POST para agregar una nueva cita
        axios.post('http://localhost/Tracelink/cita/agregar_cita.php', formData)
            .then(response => {
                setCitas([...citas, response.data]);
                setFormData({
                    nombre_mecanico: '',
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
                        <Form.Control 
                            type="text" 
                            name="nombre_mecanico"
                            value={formData.nombre_mecanico}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre del mecánico" 
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