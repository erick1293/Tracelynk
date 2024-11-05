import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Autocomplete, TextField } from '@mui/material';

function FiltrarPorFecha() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [error, setError] = useState(null);
  const [datosMantencion, setDatosMantencion] = useState([]);
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [citas, setCitas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
    idCita: '',
    vehiculo_id: '',
    fecha: '',
    descripcion: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [mantencionSeleccionada, setMantencionSeleccionada] = useState(null);
  const [editarMantenimiento, setEditarMantenimiento] = useState({
    idCita: '',
    vehiculo_id: '',
    fecha: '',
    descripcion: ''
  });

  useEffect(() => {
    // Llamada inicial para obtener la lista de mecánicos
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/mecanicos/obtenerMecanicos.php')
      .then(response => {
        setMecanicos(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los mecánicos: ", error);
      });

    const cargarDatosIniciales = async () => {
      await cargarMecanicos();
      await cargarDatosMantencion();
      await cargarCitas();
      await cargarVehiculos();
    };
    cargarDatosIniciales();
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
        params.mechanic_name = selectedMechanic.nombre; 
      }

      const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/filtrar_mantencion.php', {
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
        vehiculo_id: mantencion.vehiculo_id,
        fecha: mantencion.fecha,
        descripcion: mantencion.descripcion
      });
      setShowModal(true);
    } else {
      console.error('Mantención no encontrada con el ID:', idMantencion);
    }
  };

  const handleSubmitEditar = async (e) => {
    e.preventDefault();
    console.log(editarMantenimiento);
    try {
      const response = await axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/editar_Mantencion.php  ', {
        idMantencion: mantencionSeleccionada.idMantencion,
        ...editarMantenimiento
      });
      if (response.data.message) {
        alert(response.data.message);
        cargarDatosMantencion();
        handleCloseModal();
      } else {
        alert('Error al editar la mantención: ' + (response.data.error || 'Ocurrió un error desconocido'));
      }
    } catch (error) {
      alert('Error al editar la mantención: ' + (error.message || 'Ocurrió un error desconocido'));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditarMantenimiento({
      idCita: '',
      fecha: '',
      descripcion: ''
    });
    setMantencionSeleccionada(null);
  };

  const handleDelete = async (mantencionId) => {
    try {
      const response = await axios.post(
        'http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/eliminar_mantencion.php',
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

  const cargarDatosMantencion = async () => {
    try {
      const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/dato.php');
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setDatosMantencion(response.data.mantenciones);
    } catch (error) {
      console.error('Error al obtener los datos de mantención:', error);
      setError('Error al obtener los datos de mantención: ' + error.message);
    }
  };

  const cargarCitas = async () => {
    try {
      const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/obtener_citas.php');
      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de citas:', error);
      setError('Error al obtener los datos de citas.');
    }
  };

  const cargarVehiculos = async () => {
    try {
      const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/Vehiculos.php');
      setVehiculos(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de vehículos:', error);
      setError('Error al obtener los datos de vehículos.');
    }
  };

  const cargarMecanicos = async () => {
    try {
      const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/obtenerMecanicos.php');
      setMecanicos(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de mecánicos:', error);
      setError('Error al obtener los datos de mecánicos.');
    }
  };

  return (
    <div>
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
          <Form.Label>Nombre del Taller</Form.Label>
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
            <th>Nombre Del taller</th>
            <th>Descripción</th>
            <th>Patente Vehículo</th> 
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((mantencion) => (
            <tr key={mantencion.cita_id}>
              <td>{mantencion.cita_id}</td>
              <td>{mantencion.fecha}</td>
              <td>{`${mantencion.mecanico_nombre} ${mantencion.mecanico_apellido}`}</td>
              <td>{mantencion.descripcion}</td>
              <td>{mantencion.vehiculo_patente}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Tabla de Mantenciones </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Patente vehiculo</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {datosMantencion.map((mantencion) => (
            <tr key={mantencion.idMantencion}>
              <td>{mantencion.idMantencion}</td>
              <td>{mantencion.fecha}</td>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mantención</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEditar}>
            <Form.Group controlId="idCitaEditar">
              <Form.Label>ID de la Cita</Form.Label>
              <Form.Control as="select" value={editarMantenimiento.idCita} onChange={(e) => setEditarMantenimiento({ ...editarMantenimiento, idCita: e.target.value })}>
                <option value="">Seleccione una cita</option>
                {citas.map(cita => (
                  <option key={cita.id} value={cita.id}>
                    {cita.fecha} - {cita.descripcion} - {cita.patente} ({cita.marca} {cita.modelo})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editarMantencionVehiculoId">
              <Form.Label>Patente del Vehículo</Form.Label>
              <Autocomplete
                options={vehiculos}
                getOptionLabel={(option) => option.patente}
                value={vehiculos.find(v => v.id === editarMantenimiento.vehiculo_id) || null}
                onChange={(event, newValue) => {
                  setEditarMantenimiento({ ...editarMantenimiento, vehiculo_id: newValue ? newValue.id : '' });
                }}
                renderInput={(params) => <TextField {...params} placeholder="Seleccione la patente del vehículo" />}
              />
            </Form.Group>
            <Form.Group controlId="editarMantencionFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={editarMantenimiento.fecha}
                onChange={(e) => setEditarMantenimiento({ ...editarMantenimiento, fecha: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editarMantencionDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={editarMantenimiento.descripcion}
                onChange={(e) => setEditarMantenimiento({ ...editarMantenimiento, descripcion: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FiltrarPorFecha;
