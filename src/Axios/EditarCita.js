import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const EditarCita = () => {
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

  // Función para obtener las citas desde el servidor
  const fetchCitas = async () => {
    try {
      const response = await axios.get('http://localhost/Tracelink/cita/obtener_citas.php');
      setCitas(response.data);
    } catch (error) {
      setError('Error al obtener las citas: ' + error.message);
    }
  };

  useEffect(() => {
    // Funciones para obtener mecánicos y vehículos
    const fetchMecanicos = async () => {
      try {
        const response = await axios.get('http://localhost/Tracelink/mecanicos/obtenerMecanicos.php');
        setMecanicos(response.data);
      } catch (error) {
        console.error('Error fetching mechanics:', error);
      }
    };

    const fetchVehiculos = async () => {
      try {
        const response = await axios.get('http://localhost/Tracelink/Mantenimiento/Vehiculos.php');
        setVehiculos(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    // Obtener las citas una vez que se monte el componente
    fetchMecanicos();
    fetchVehiculos();
    fetchCitas();
  }, []); // Ejecutar solo una vez al montar el componente

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = (cita) => {
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
      const response = await axios.delete(`http://localhost/Tracelink/cita/eliminarCita.php?id=${cita.cita_id}`);
      console.log('Cita eliminada:', response.data);
      fetchCitas(); // Actualizar la lista de citas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      // Manejar el error, mostrar un mensaje de error, etc.
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviado hacia el php ", formData);
    try {
      const response = await axios.put(`http://localhost/Tracelink/cita/Editar_cita_test.php?id=${citaSeleccionada.cita_id}`, formData);

      console.log('Cita actualizada exitosamente:', response.data);
      fetchCitas(); // Actualizar la lista de citas después de editar
      closeModal(); // Cerrar el modal después de la edición exitosa
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error
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

  return (
    <div>
      <Navbar />
      {/* Mostrar tabla de citas */}
      <h2>Citas Registradas</h2>
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
            <th>Acciones</th>
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
                <button onClick={() => handleEliminar(cita)}>Eliminar</button>
                <button onClick={() => handleEditClick(cita)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar cita */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <Autocomplete
                options={mecanicos}
                getOptionLabel={(option) => `${option.nombre} ${option.apellido}`}
                value={mecanicos.find(mecanico => mecanico.idMecanico === formData.mecanico_id) || null}
                onChange={(e, newValue) => {
                  if (newValue) {
                    setFormData({
                      ...formData,
                      mecanico_id: newValue.idMecanico, // Establecer el ID del mecánico seleccionado
                    });
                  } else {
                    setFormData({
                      ...formData,
                      mecanico_id: '', // Limpiar el ID del mecánico si se deselecciona
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Nombre del Mecánico" />}
              />

              <div>
                <label>Fecha:</label>
                <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
              </div>
              <div>
                <label>Hora:</label>
                <input type="time" name="hora" value={formData.hora} onChange={handleInputChange} />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
              </div>
              <div>
                <Autocomplete
                  options={vehiculos}
                  getOptionLabel={(option) => `${option.marca} ${option.modelo} (${option.patente})`}
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
                  renderInput={(params) => <TextField {...params} label="Vehículo" />}
                />
              </div>
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarCita;
