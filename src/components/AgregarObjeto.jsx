import React, { useState, useEffect } from 'react';
import '../stylesheets/AgregarObjetos.css';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Navbar from './Navbar'; // Importa el componente Navbar
import axios from 'axios';

function AgregarObjeto() {
  const [data, setData] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', altura: '', ancho: '', id:'', vehiculo_id: '' });
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
    return c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      c.altura.toLowerCase().includes(filtro.toLowerCase()) ||
      c.ancho.toLowerCase().includes(filtro.toLowerCase()) ||
      c.id.toString().toLowerCase().includes(filtro.toLowerCase()) ||
      c.vehiculo_id.toLowerCase().includes(filtro.toLowerCase());
  });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarAgregar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '') {
      alert('El nombre del objeto no puede estar vacío');
      return;
    }

    axios.post('http://localhost/Tracelink/Objetos/agregarObjeto.php', formulario)
      .then(response => {
        setFormulario({ nombre: '', altura: '', ancho: '', vehiculo_id: '' });
        setObjetos([...objetos, { ...formulario, id: response.data.id }]);
        alert('Objeto agregado con éxito');
      })
      .catch(error => console.error('Error al agregar el objeto:', error));
  };

  const manejarEditar = (carga) => {
    setCargaSeleccionada(carga);
    setShowModal(true);
  };

  const manejarGuardarEdicion = () => {
    axios.post('http://localhost/Tracelink/Objetos/editarObjeto.php', cargaSeleccionada)
      .then(response => {
        setObjetos(objetos.map(obj => obj.id === cargaSeleccionada.id ? cargaSeleccionada : obj));
        setShowModal(false);
        alert('Objeto editado con éxito');
      })
      .catch(error => console.error('Error al editar el objeto:', error));
  };

  const manejarBorrar = (id) => {
    axios.post('http://localhost/Tracelink/Objetos/borrarObjeto.php', { id })
      .then(response => {
        setObjetos(objetos.filter(objeto => objeto.id !== id));
        alert('Objeto borrado con éxito');
      })
      .catch(error => console.error('Error al borrar el objeto:', error));
  };

  const manejarCambioModal = (e) => {
    setCargaSeleccionada({ ...cargaSeleccionada, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <label>
          Nombre del objeto:
          <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} />
        </label>
        <label>
          Altura:
          <input type="number" name="altura" value={formulario.altura} onChange={manejarCambio} />
        </label>
        <label>
          Ancho:
          <input type="number" name="ancho" value={formulario.ancho} onChange={manejarCambio} />
        </label>
        <label>
          Vehículo:
          <select name="vehiculo_id" value={formulario.vehiculo_id} onChange={manejarCambio}>
            <option value="">Selecciona un vehículo</option>
            {vehiculos.map(vehiculo => (
              <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.patente}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={manejarAgregar} className="btn btn-primary">Agregar objeto</button>
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id Carga</th>
            <th>Nombre De la carga</th>
            <th>Altura</th>
            <th>Ancho</th>
            <th>vehiculo_id</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargaFiltradas.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.altura}</td>
              <td>{c.ancho}</td>
              <td>{c.vehiculo_id}</td>
              <td>
                <Button variant="warning" onClick={() => manejarEditar(c)}>Editar Carga</Button>
                <Button variant="danger" onClick={() => manejarBorrar(c.id)}>Eliminar Carga</Button>
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
              <Form.Label>Nombre del objeto</Form.Label>
              <Form.Control type="text" name="nombre" value={cargaSeleccionada?.nombre || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Altura</Form.Label>
              <Form.Control type="number" name="altura" value={cargaSeleccionada?.altura || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ancho</Form.Label>
              <Form.Control type="number" name="ancho" value={cargaSeleccionada?.ancho || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vehículo</Form.Label>
              <Form.Control as="select" name="vehiculo_id" value={cargaSeleccionada?.vehiculo_id || ''} onChange={manejarCambioModal}>
                <option value="">Selecciona un vehículo</option>
                {vehiculos.map(vehiculo => (
                  <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.patente}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="btn btn-secondary">Cerrar</Button>
          <Button variant="primary" onClick={manejarGuardarEdicion} className="btn btn-primary">Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AgregarObjeto;
