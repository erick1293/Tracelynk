import { useState, useEffect } from "react";
import Navbar from './Navbar';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function EstadoComponent() {
  const [estados, setEstados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState({ idEstado: '', estado: '', fecha: '' });
  const [estadoAModificar, setEstadoAModificar] = useState(null);
  const [formulario, setFormulario] = useState({ vehiculo_id: '' });
  const [vehiculos, setVehiculos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // Obtener los estados al cargar el componente
    axios.get('http://localhost/Tracelink/Estados/obtenerEstados.php')
      .then(response => setEstados(response.data))
      .catch(error => console.error('Error al obtener los estados:', error));
  }, []);

  const agregarEstado = (e) => {
    e.preventDefault();

    if (nuevoEstado.estado === '' || nuevoEstado.fecha === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    axios.post('http://localhost/Tracelink/Estados/Agregar_Estado.php', nuevoEstado)
      .then(response => {
        if (response.data.success) {
          const nuevoIdEstado = response.data.idEstado.toString();
          setEstados([...estados, { ...nuevoEstado, idEstado: nuevoIdEstado }]);
          setNuevoEstado({ idEstado: '', estado: '', fecha: '' });
          alert('Estado agregado con éxito');
        } else {
          alert('Error al agregar el estado: ' + response.data.error);
        }
      })
      .catch(error => console.error('Error al agregar el estado:', error));
  };

  const EstadoFiltradas = estados.filter(e => {
    return e.idEstado.toString().toLowerCase().includes(filtro.toLowerCase()) ||
      e.estado.toLowerCase().includes(filtro.toLowerCase()) ||
      e.fecha.toLowerCase().includes(filtro.toLowerCase());
  });

  function prepararModificacion(id) {
    const estado = estados.find(estado => estado.idEstado === id);
    setEstadoAModificar(estado);
    setNuevoEstado(estado);
  }

  function aplicarModificacion() {
    if (estadoAModificar && nuevoEstado.estado) {
      const nuevosEstados = estados.map(estado => estado.idEstado === estadoAModificar.idEstado ? nuevoEstado : estado);
      setEstados(nuevosEstados);
      setEstadoAModificar(null);
      setNuevoEstado({ idEstado: '', estado: '', fecha: '' });
    }
  }

  function eliminarEstado(id) {
    const nuevosEstados = estados.filter(estado => estado.idEstado !== id);
    setEstados(nuevosEstados);
  }

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => { e.preventDefault(); estadoAModificar ? aplicarModificacion() : agregarEstado(e); }}>
        <label>
          Estado
          <input type="text" placeholder="Estado" value={nuevoEstado.estado} onChange={(e) => setNuevoEstado({ ...nuevoEstado, estado: e.target.value })} />
        </label>
        <label>
          Fecha:<br/>
          <input
            type="date"
            value={nuevoEstado.fecha}
            onChange={(e) => setNuevoEstado({ ...nuevoEstado, fecha: e.target.value })}
          />
        </label>
        <button type="submit" className="btn btn-primary">Agregar Estado</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {EstadoFiltradas.map(e => (
            <tr key={e.idEstado}>
              <td>{e.estado}</td>
              <td>{e.fecha}</td>
              <td>
                <Button variant="warning" onClick={() => prepararModificacion(e.idEstado)}>Editar Estado</Button>
                <Button variant="danger" onClick={() => eliminarEstado(e.idEstado)}>Eliminar estado</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoComponent;
