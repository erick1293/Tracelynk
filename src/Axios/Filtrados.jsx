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
  const [datosMantencion, setDatosMantencion] = useState([]);
  const [mantencionSeleccionada, setMantencionSeleccionada] = useState(null);
  const [editarMantenimiento, setEditarMantenimiento] = useState({
    idCita: '',
    idVehiculo: '',
    fecha: '',
    descripcion: ''
});
const [showModal, setShowModal] = useState(false);


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
    setSelectedMechanic(newValue); // Actualizar el mecánico seleccionado
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
  const handleModificar = (idMantencion) => {
    const mantencion = datosMantencion.find(m => m.idMantencion === idMantencion);
    if (mantencion) {
        setMantencionSeleccionada(mantencion);
        setEditarMantenimiento({
            idCita: mantencion.cita_id,
            idVehiculo: mantencion.vehiculo_id,
            fecha: mantencion.fecha,
            descripcion: mantencion.descripcion
        });
        setShowModal(true);
    } else {
        console.error('Mantención no encontrada con el ID:', idMantencion);
    }
};
const cargarDatosMantencion = async () => {
  try {
      const response = await axios.get('http://localhost/Tracelink/Mantenimiento/dato.php');
      if (response.data.error) {
          throw new Error(response.data.error);
      }
      setDatosMantencion(response.data.mantenciones);
  } catch (error) {
      console.error('Error al obtener los datos de mantención:', error);
      setError('Error al obtener los datos de mantención: ' + error.message);
  }
};

const handleDelete = async (mantencionId) => {
  try {
      const response = await axios.post(
          'http://localhost/Tracelink/Mantenimiento/eliminar_mantencion.php',
          { idMantencion: mantencionId },
          { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
          alert('Mantención eliminada correctamente');
          cargarDatosMantencion();
      } else {
          alert('Error al eliminar la mantención: ' + response.data.error);
      }
  } catch (error) {
      alert('Error al eliminar la mantención: ' + (error.message || 'Ocurrió un error desconocido'));
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
              <td>
                    <Button variant="warning" onClick={() => handleModificar(mantencion.idMantencion)}>Modificar</Button>
                    <Button variant="danger" onClick={() => handleDelete(mantencion.idMantencion)}>Eliminar</Button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FiltrarPorFecha;
