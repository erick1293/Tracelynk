import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Autocomplete, TextField } from '@mui/material';
import "../stylesheets/AgendarCita.css"

function FiltrarPorFecha() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [mecanicos, setMecanicos] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamada inicial para obtener la lista de mecánicos
    axios.get('http://localhost/Tracelink/mecanicos/obtenerMecanicos.php')
      .then(response => {
        setMecanicos(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los mecánicos: ", error);
      });
  }, []);

  const handleMecanicoChange = (event, newValue) => {
    setSelectedMechanic(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let params = {
        from_date: fromDate,
        to_date: toDate,
      };

      if (selectedMechanic) {
        params.mechanic_name = selectedMechanic.nombre; // Asegúrate de usar 'nombre' del objeto selectedMechanic
      }

      const response = await axios.get('http://localhost/Tracelink/Mantenimiento/filtrar_mantencion.php', {
        params: params
      });

      if (Array.isArray(response.data)) {
        setDatosFiltrados(response.data);
      } else {
        setDatosFiltrados([]);
      }
    } catch (error) {
      console.error('Error al obtener los datos filtrados:', error);
      setError('Error al obtener los datos filtrados.');
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Filtrar Mantenciones por Fecha y Mecánico</h2>
      {error && <p>Error: {error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fromDate">
          <Form.Label>Del Día</Form.Label>
          <Form.Control
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="toDate">
          <Form.Label>Hasta el Día</Form.Label>
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNombreMecanico">
          <Form.Label>Nombre del Mecánico</Form.Label>
          <Autocomplete
            options={mecanicos}
            getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
            onChange={handleMecanicoChange}
            value={selectedMechanic}
            renderInput={(params) => <TextField {...params} placeholder="Seleccione el nombre del mecánico" />}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>

      <h2>Resultados Filtrados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Nombre Mecánico</th>
            <th>Descripción</th>
            <th>Patente Vehículo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((mantencion) => (
            <tr key={mantencion.idMantencion}>
              <td>{mantencion.idMantencion}</td>
              <td>{mantencion.fecha}</td>
              <td>{`${mantencion.mecanico_nombre} ${mantencion.mecanico_apellido}`}</td>
              <td>{mantencion.descripcion}</td>
              <td>{mantencion.patente}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FiltrarPorFecha;
