import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import axios from './axiosConfig';

// Componente para agregar, editar y eliminar mecánicos
function AgregarMecanico() {
  // Definición de estados utilizando useState
  const [mecanicos, setMecanicos] = useState([]); // Estado para almacenar la lista de mecánicos
  const [formulario, setFormulario] = useState({ nombre: '', apellido: '', rut: '', especialidad: '' }); // Estado para el formulario de agregar/editar mecánico
  const [mecanicoSeleccionado, setMecanicoSeleccionado] = useState(null); // Estado para el mecánico seleccionado para editar
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [filtro, setFiltro] = useState(''); // Estado para el filtro de búsqueda

  // Función para ordenar los mecánicos por nombre
  const ordenarMecanicosPorNombre = () => {
    setMecanicos([...mecanicos.sort((a, b) => a.nombre.localeCompare(b.nombre))]);
  };

  // useEffect para obtener la lista de mecánicos al montar el componente
  useEffect(() => {
    axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Loguin//Mecanicos/obtenerMecanicos.php')
      .then(response => setMecanicos(response.data))
      .catch(error => console.error('Error al obtener los mecánicos:', error));
  }, []);

  // Filtrar y ordenar mecánicos según el texto del filtro
  const mecanicosFiltrados = mecanicos
    .filter(m => {
      return (
        m.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        m.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
        m.rut.toLowerCase().includes(filtro.toLowerCase()) ||
        m.especialidad.toLowerCase().includes(filtro.toLowerCase())
      );
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar por nombre ascendente

  // Función para validar el formato de RUT con módulo 11
  const validarRut = (rut) => {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
      return false;
    }
    const [rutBase, dv] = rut.split('-');
    let total = 0;
    let factor = 2;
    for (let i = rutBase.length - 1; i >= 0; i--) {
      total += parseInt(rutBase[i]) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    const dvEsperado = 11 - (total % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv.toUpperCase() === dvCalculado;
  };

  // Manejar cambios en los campos del formulario
  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario para agregar un mecánico
  const manejarAgregar = (e) => {
    e.preventDefault();

    if (
      formulario.nombre === '' ||
      formulario.apellido === '' ||
      formulario.rut === '' ||
      formulario.especialidad === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (!validarRut(formulario.rut)) {
      alert('Formato de RUT inválido');
      return;
    }

    axios
      .post('http://localhost/Tracelink/Mecanicos/agregarMecanico.php', formulario)
      .then((response) => {
        setFormulario({
          nombre: '',
          apellido: '',
          rut: '',
          especialidad: '',
        });
        setMecanicos([...mecanicos, { ...formulario, idMecanico: response.data.idMecanico }]);
        alert('Mecánico agregado con éxito');
      })
      .catch((error) => console.error('Error al agregar el mecánico:', error));
  };

  // Manejar la edición de un mecánico
  const manejarEditar = (mecanico) => {
    setMecanicoSeleccionado(mecanico);
    setShowModal(true);
  };

  // Manejar la guardado de la edición de un mecánico
  const manejarGuardarEdicion = () => {
    axios.post('http://localhost/Tracelink/Mecanicos/editarMecanico.php', mecanicoSeleccionado)
      .then(response => {
        setMecanicos(mecanicos.map(m => m.idMecanico === mecanicoSeleccionado.idMecanico ? mecanicoSeleccionado : m));
        setShowModal(false);
        alert('Mecánico editado con éxito');
      })
      .catch(error => console.error('Error al editar el mecánico:', error));
  };

  // Manejar la eliminación de un mecánico
  const manejarBorrar = (idMecanico) => {
    axios.post('http://localhost/Tracelink/Mecanicos/borrarMecanico.php', { idMecanico })
      .then(response => {
        setMecanicos(mecanicos.filter(m => m.idMecanico !== idMecanico));
        alert('Mecánico borrado con éxito');
      })
      .catch(error => console.error('Error al borrar el mecánico:', error));
  };

  // Manejar cambios en los campos del modal de edición
  const manejarCambioModal = (e) => {
    setMecanicoSeleccionado({ ...mecanicoSeleccionado, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <label>
          Nombre de taller mecanico:
          <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} />
        </label>
        <label>
          Direccion:
          <input type="text" name="apellido" value={formulario.apellido} onChange={manejarCambio} />
        </label>
        <label>
          RUT Empresa:
          <input type="text" name="rut" value={formulario.rut} onChange={manejarCambio} />
        </label>
        <label>
          Descripcion:
          <input type="text" name="especialidad" value={formulario.especialidad} onChange={manejarCambio} />
        </label>
        <button type="button" onClick={manejarAgregar} className="btn btn-primary">Agregar Taller Mecanico</button>
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de Taller Mecanico</th>
            <th>Direccion</th>
            <th>RUT Empresa</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mecanicosFiltrados.map(m => (
            <tr key={m.idMecanico}>
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
          <Modal.Title>Editar Taller Mecánico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre de taller mecanico</Form.Label>
              <Form.Control type="text" name="nombre" value={mecanicoSeleccionado?.nombre || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" name="apellido" value={mecanicoSeleccionado?.apellido || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>RUT Empresarial</Form.Label>
              <Form.Control type="text" name="rut" value={mecanicoSeleccionado?.rut || ''} onChange={manejarCambioModal} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control type="text" name="especialidad" value={mecanicoSeleccionado?.especialidad || ''} onChange={manejarCambioModal} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="btn btn-secondary">Cerrar</Button>
          <Button variant="primary" onClick={manejarGuardarEdicion} className="btn btn-primary">Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AgregarMecanico;
