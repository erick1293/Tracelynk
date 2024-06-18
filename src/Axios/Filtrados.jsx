import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';

function FiltrarPorFecha() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]); // Inicializado como array vacío []
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('fromDate:', fromDate);
    console.log('toDate:', toDate);
    try {
      const response = await axios.get('http://localhost/Tracelink/Mantenimiento/filtrar_mantencion.php', {
        params: {
          from_date: fromDate,
          to_date: toDate
        }
      });
      console.log('Response from server:', response.data);
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
      <h2>Filtrar Mantenciones por Fecha</h2>
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
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((mantencion) => (
            <tr key={mantencion.idMantencion}>
              <td>{mantencion.idMantencion}</td>
              <td>{mantencion.fecha}</td>
              <td>{mantencion.nombre_mecanico}</td>
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
