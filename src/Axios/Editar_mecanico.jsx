import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import axios from './axiosConfig';

function AgregarMecanico() {
  const [mecanicos, setMecanicos] = useState([]);
  const [formulario, setFormulario] = useState({ idMecanico: '', nombre: '', apellido: '', rut: '', especialidad: '' });
  const [mecanicoSeleccionado, setMecanicoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mecanicos/obtenerMecanicos.php')
      .then(response => setMecanicos(response.data))
      .catch(error => console.error('Error al obtener los mecánicos:', error));
  }, []);

  const mecanicosFiltrados = mecanicos.filter(m => {
    return m.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      m.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      m.rut.toLowerCase().includes(filtro.toLowerCase()) ||
      m.especialidad.toLowerCase().includes(filtro.toLowerCase());
  });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarAgregar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '' || formulario.apellido === '' || formulario.rut === '' || formulario.especialidad === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mecanicos/agregarMecanico.php', formulario)
      .then(response => {
        setFormulario({ idMecanico: '', nombre: '', apellido: '', rut: '', especialidad: '' });
        setMecanicos([...mecanicos, { ...formulario, idMecanico: response.data.idMecanico }]);
        alert('Mecánico agregado con éxito');
      })
      .catch(error => console.error('Error al agregar el mecánico:', error));
  };

  const manejarEditar = (mecanico) => {
    setMecanicoSeleccionado(mecanico);
    setShowModal(true);
  };

  const manejarGuardarEdicion = () => {
    axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mecanicos/editarMecanico.php', mecanicoSeleccionado)
      .then(response => {
        setMecanicos(mecanicos.map(m => m.idMecanico === mecanicoSeleccionado.idMecanico ? mecanicoSeleccionado : m));
        setShowModal(false);
        alert('Mecánico editado con éxito');
      })
      .catch(error => console.error('Error al editar el mecánico:', error));
  };

  const manejarBorrar = (idMecanico) => {
    axios.post('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mecanicos/borrarMecanico.php', { idMecanico })
      .then(response => {
        setMecanicos(mecanicos.filter(m => m.idMecanico !== idMecanico));
        alert('Mecánico borrado con éxito');
      })
      .catch(error => console.error('Error al borrar el mecánico:', error));
  };

  const manejarCambioModal = (e) => {
    setMecanicoSeleccionado({ ...mecanicoSeleccionado, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Form inline>
        <FormControl type="text" placeholder="Buscar" className="mr-sm-2" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      </Form>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id Mecánico</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>RUT</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mecanicosFiltrados.map(m => (
            <tr key={m.idMecanico}>
              <td>{m.idMecanico}</td>
              <td>{m.nombre}</td>
              <td>{m.apellido}</td>
              <td>{m.rut}</td>
              <td>{m.especialidad}</td>
              <td>
                <Button variant="warning" onClick={() => manejarEditar(m)}>Editar</Button>
                <Button variant="danger" onClick={() => manejarBorrar(m.idMecanico)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mecánico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={mecanicoSeleccionado?.nombre || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="apellido" value={mecanicoSeleccionado?.apellido || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>RUT</Form.Label>
              <Form.Control type="text" name="rut" value={mecanicoSeleccionado?.rut || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Especialidad</Form.Label>
              <Form.Control type="text" name="especialidad" value={mecanicoSeleccionado?.especialidad || ''} onChange={manejarCambioModal} />
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

export default AgregarMecanico;
