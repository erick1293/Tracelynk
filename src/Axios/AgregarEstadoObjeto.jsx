import React, { useState, useEffect } from 'react';
import '../stylesheets/AgregarObjetos.css';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../components/Navbar'; // Importa el componente Navbar
import axios from 'axios';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf'; // Importa la biblioteca jsPDF

function AgregarObjeto() {
  const [data, setData] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [formulario, setFormulario] = useState({ id:'', vehiculo_id: '', estado_objeto: '', nombre_objeto: '' });
  const [vehiculos, setVehiculos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [cargaSeleccionada, setCargaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Obtener los vehículos al cargar el componente
    axios.get('http://localhost/Tracelink/Objetos/obtenerVehiculos.php')
      .then(response => setVehiculos(response.data))
      .catch(error => console.error('Error al obtener los vehículos:', error));

    // Obtener las cargas al cargar el componente
    axios.get('http://localhost/Tracelink/Objetos/obtenerObjetos.php')
      .then(response => setObjetos(response.data))
      .catch(error => console.error('Error al obtener las cargas:', error));
  }, []);

  const cargaFiltradas = objetos.filter(c => {
    return c.id.toString().toLowerCase().includes(filtro.toLowerCase()) ||
      c.vehiculo_id.toLowerCase().includes(filtro.toLowerCase()) ||
      c.estado_objeto.toLowerCase().includes(filtro.toLowerCase()) ||
      c.nombre_objeto.toLowerCase().includes(filtro.toLowerCase());
  });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEditar = (carga) => {
    setCargaSeleccionada(carga);
    setShowModal(true);
  };

  const manejarGuardarEdicion = () => {
    axios.post('http://localhost/Tracelink/Objetos/AgregarEstado.php', cargaSeleccionada)
      .then(response => {
        setObjetos(objetos.map(obj => obj.id === cargaSeleccionada.id ? cargaSeleccionada : obj));
        setShowModal(false);
        alert('Objeto editado con éxito');
      })
      .catch(error => console.error('Error al editar el objeto:', error));
  };

  const manejarCambioModal = (e) => {
    setCargaSeleccionada({ ...cargaSeleccionada, [e.target.name]: e.target.value });
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID Carga", "Vehiculo ID", "Nombre del Objeto", "Estado"];
    const tableRows = [];
  
    cargaFiltradas.forEach(carga => {
      const cargaData = [
        carga.id,
        carga.vehiculo_id,
        carga.nombre,
        carga.estado_objeto,
      ];
      tableRows.push(cargaData);
    });
  
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save('tabla.pdf');
  };
  
  

  return (
    <div>
      <Button onClick={descargarPDF}>Descargar PDF</Button> {/* Botón para descargar PDF */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id Carga</th>
            <th>vehiculo_id</th>
            <th>Nombre del Objeto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargaFiltradas.map(c => (
            <tr key={c.id}>
              <td>{c.idnp}</td>
              <td>{c.vehiculo_id}</td>
              <td>{c.nombre}</td>
              <td>{c.estado_objeto}</td>
              <td>
                <Button variant="warning" onClick={() => manejarEditar(c)}>Modificar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Carga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Vehículo</Form.Label>
              <Form.Control as="select" name="vehiculo_id" value={cargaSeleccionada?.vehiculo_id || ''} onChange={manejarCambioModal}>
                <option value="">Selecciona un vehículo</option>
                {vehiculos.map(vehiculo => (
                  <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.patente}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" name="estado_objeto" value={cargaSeleccionada?.estado_objeto || ''} onChange={manejarCambioModal}>
                <option value="">Selecciona un estado</option>
                <option value="En camino">En camino</option>
                <option value="Entregado">Entregado</option>
                <option value="Perdido">Perdido</option>
                <option value="En mantencion">En mantención</option>
                <option value="En bodega">En bodega</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="btn btn-secondary">Cerrar</Button>
          <Button variant="primary" onClick={manejarGuardarEdicion} className="btn btn-primary">Modificar estado</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AgregarObjeto;   