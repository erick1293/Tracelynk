import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import axios from './axiosConfig';

function ModificarEstado() {
  const [estados, setEstados] = useState([]);
  const [formulario, setFormulario] = useState({ idEstado: '', estado: '', fecha: '' });
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Estados/obtenerEstados.php')
      .then(response => setEstados(response.data))
      .catch(error => console.error('Error al obtener los estados:', error));
  }, []);

  const estadosFiltrados = estados.filter(e => {
    return e.estado.toLowerCase().includes(filtro.toLowerCase()) ||
      e.fecha.toLowerCase().includes(filtro.toLowerCase());
  });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarAgregar = (e) => {
    e.preventDefault();

    if (formulario.estado === '' || formulario.fecha === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Estados/agregarEstado.php', formulario)
      .then(response => {
        setFormulario({ idEstado: '', estado: '', fecha: '' });
        setEstados([...estados, { ...formulario, idEstado: response.data.idEstado }]);
        alert('Estado agregado con éxito');
      })
      .catch(error => console.error('Error al agregar el estado:', error));
  };

  const manejarEditar = (estado) => {
    setEstadoSeleccionado(estado);
    setShowModal(true);
  };

  const manejarGuardarEdicion = () => {
    axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Estados/editarEstado.php', estadoSeleccionado)
      .then(response => {
        setEstados(estados.map(e => e.idEstado === estadoSeleccionado.idEstado ? estadoSeleccionado : e));
        setShowModal(false);
        alert('Estado editado con éxito');
      })
      .catch(error => console.error('Error al editar el estado:', error));
  };

  const manejarBorrar = (idEstado) => {
    axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Estados/borrarEstado.php', { idEstado })
      .then(response => {
        setEstados(estados.filter(e => e.idEstado !== idEstado));
        alert('Estado borrado con éxito');
      })
      .catch(error => console.error('Error al borrar el estado:', error));
  };

  const manejarCambioModal = (e) => {
    setEstadoSeleccionado({ ...estadoSeleccionado, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Form inline>
        <FormControl type="text" placeholder="Buscar" className="mr-sm-2" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id Estado</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estadosFiltrados.map(e => (
            <tr key={e.idEstado}>
              <td>{e.idEstado}</td>
              <td>{e.estado}</td>
              <td>{e.fecha}</td>
              <td>
                <Button variant="warning" onClick={() => manejarEditar(e)}>Editar</Button>
                <Button variant="danger" onClick={() => manejarBorrar(e.idEstado)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Control type="text" name="estado" value={estadoSeleccionado?.estado || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={estadoSeleccionado?.fecha || ''} onChange={manejarCambioModal} />
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

export default ModificarEstado;
