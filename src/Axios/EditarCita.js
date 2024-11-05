import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { Table, Button, Modal } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EditarCita = ({ userRole }) => {
  const [mecanicos, setMecanicos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    descripcion: '',
    mecanico_id: '',
    vehiculo_id: '',
  });
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const fetchCitas = async () => {
    try {
      const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/cita/obtener_citas.php');
      setCitas(response.data);
      console.log('Citas:', response.data);
    } catch (error) {
      setError('Error al obtener las citas: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mecanicos/obtenerMecanicos.php');
        setMecanicos(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    const fetchVehiculos = async () => {
      try {
        const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/Vehiculos.php');
        setVehiculos(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchMecanicos();
    fetchVehiculos();
    fetchCitas();
    console.log("Component mounted");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (cita) => {
    console.log('Editing cita:', cita);
    setCitaSeleccionada(cita);
    setFormData({
      fecha: cita.fecha,
      hora: cita.hora,
      descripcion: cita.descripcion,
      mecanico_id: cita.mecanico_id,
      vehiculo_id: cita.vehiculo_id,
    });
    setModalOpen(true);
  };

  const handleEliminar = async (cita) => {
    try {
      const response = await axios.delete(`http://ec2-54-221-134-204.compute-1.amazonaws.com/cita/eliminarCita.php?id=${cita.cita_id}`);
      console.log('Cita eliminada:', response.data);
      fetchCitas();
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviado hacia el php ", formData);
    try {
      const response = await axios.put(`http://ec2-54-221-134-204.compute-1.amazonaws.com/cita/Editar_cita_test.php?id=${citaSeleccionada.cita_id}`, formData);
      console.log('Cita actualizada exitosamente:', response.data);
      fetchCitas();
      closeModal();
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCitaSeleccionada(null);
    setFormData({
      fecha: '',
      hora: '',
      descripcion: '',
      mecanico_id: '',
      vehiculo_id: '',
    });
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Fecha', 'Hora', 'Descripción', 'Mecánico', 'Vehículo']],
      body: citas.map(cita => [
        cita.cita_id,
        cita.fecha,
        cita.hora,
        cita.descripcion,
        `${cita.nombre_mecanico} ${cita.apellido_mecanico}`,
        cita.patente
      ])
    });
    doc.save('lista_citas.pdf');
  };

  return (
    <div>
      <h2>Citas Registradas</h2>
      <Button onClick={descargarPDF}>Descargar PDF</Button>
      {error && <p>{error}</p>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Descripción</th>
            <th>Mecánico</th>
            <th>Vehículo</th>
            <th>  {(userRole === 1 || userRole === 3) && (
              
              <p> Acciones </p>  )}
              </th>
              </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.cita_id}>
              <td>{cita.cita_id}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.descripcion}</td>
              <td>{`${cita.nombre_mecanico} ${cita.apellido_mecanico}`}</td>
              <td>{cita.patente}</td>
              <td>
                {(userRole === 1 || userRole === 3) && (
                  <>
                    <Button variant="dark" onClick={() => handleEliminar(cita)}>Eliminar</Button>
                    <Button variant="success" onClick={() => handleEditClick(cita)}>Editar</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Autocomplete
                options={mecanicos}
                getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
                value={mecanicos.find(mecanico => mecanico.idMecanico === formData.mecanico_id) || null}
                onChange={(e, newValue) => {
                  if (newValue) {
                    setFormData({
                      ...formData,
                      mecanico_id: newValue.idMecanico,
                    });
                  } else {
                    setFormData({
                      ...formData,
                      mecanico_id: '',
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Nombre del Mecánico" fullWidth />}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Fecha"
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Hora"
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
              />
            </div>
            <div className="mb-3">
              <Autocomplete
                options={vehiculos}
                getOptionLabel={(option) => option.patente}
                value={vehiculos.find(vehiculo => vehiculo.id === formData.vehiculo_id) || null}
                onChange={(e, newValue) => {
                  if (newValue) {
                    setFormData({
                      ...formData,
                      vehiculo_id: newValue.id,
                    });
                  } else {
                    setFormData({
                      ...formData,
                      vehiculo_id: '',
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Patente del Vehículo" fullWidth />}
              />
            </div>
            <Button variant="success" type="submit">
              Guardar Cambios
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditarCita;
