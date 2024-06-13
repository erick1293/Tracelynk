import { useState, useEffect } from "react";
import Navbar from './Navbar';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function EstadoComponent() {
  const [estados, setEstados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState({ idEstado: '', estado: '', fecha: ''  });
  const [estadoAModificar, setEstadoAModificar] = useState(null);
  const [formulario, setFormulario] = useState({ vehiculo_id: '' });
  const [vehiculos, setVehiculos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
      // Obtener los estados al cargar el componente
      axios.get('http://localhost/Tracelink/Estados/obtenerEstados.php')
        .then(response => setEstados(response.data))
        .catch(error => console.error('Error al obtener los estados:', error));
  
    // Obtener los vehículos al cargar el componente
    axios.get('http://localhost/Tracelink/Objetos/obtenerVehiculos.php')
      .then(response => setVehiculos(response.data))
      .catch(error => console.error('Error al obtener los vehículos:', error));
  }, []);

  const agregarEstado = (e) => {
    e.preventDefault();
  
    if (nuevoEstado.estado === '' || nuevoEstado.fecha === '') {
      alert('Por favor, completa todos los campos');
      return;
    }
  
    axios.post('http://localhost/Tracelink/Estados/Agregar_Estado.php', nuevoEstado)
      .then(response => {
        setEstados([...estados, { ...nuevoEstado, id: response.data.idEstado }]);
        setNuevoEstado({ idEstado: '', estado: '', fecha: '' }); 
        alert('Estado agregado con éxito');
      })
      .catch(error => console.error('Error al agregar el estado:', error));
  };
  

  const EstadoFiltradas = estados.filter(e => {
    return e.idEstado.toLowerCase().includes(filtro.toLowerCase()) ||
      e.estado.toLowerCase().includes(filtro.toLowerCase()) ||
      e.fecha.toLowerCase().includes(filtro.toLowerCase()) ;
  });

  function prepararModificacion(id) {
    const estado = estados.find(estado => estado.id === id);
    setEstadoAModificar(estado);
    setNuevoEstado(estado);
  }

  function aplicarModificacion() {
    if (estadoAModificar && nuevoEstado.estado) {
      const nuevosEstados = estados.map(estado => estado.id === estadoAModificar.id ? nuevoEstado : estado);
      setEstados(nuevosEstados);
      setEstadoAModificar(null);
      setNuevoEstado({ id: '', estado: '', fecha: '' });
    }
  }

  function eliminarEstado(id) {
    const nuevosEstados = estados.filter(estado => estado.id !== id);
    setEstados(nuevosEstados);
  }

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => { e.preventDefault(); estadoAModificar ? aplicarModificacion() : agregarEstado(); }}>
       <label>
        Estado
        <input type="text" placeholder="Estado" value={nuevoEstado.estado} onChange={(e) => setNuevoEstado({ ...nuevoEstado, estado: e.target.value })} />

        </label>
        <label>
          Patente de vehiculo:
          <select
            name="vehiculo_id"
            value={formulario.vehiculo_id}
            onChange={manejarCambio}
          >
            <option value="">Selecciona un vehículo</option>
            {vehiculos.map(vehiculo => (
              <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.patente}</option>
            ))}
          </select>
        </label>
        <label>
        Fecha:<br/>
        <input
          type="date"
          value={nuevoEstado.fecha}
          onChange={(e) => setNuevoEstado({ ...nuevoEstado, fecha: e.target.value })}
          />
          </label>

          <button type="button" onClick={agregarEstado} className="btn btn-primary">Agregar Estado</button>



      </form>
      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Patente vehiculo</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
  {EstadoFiltradas.map(e => {
    console.log('ID del estado:', e.idEstado);
    console.log('ID del vehículo:', e.vehiculo_id);

    return (
      <tr key={e.idEstado}>
        <td>{e.estado}</td>
        <td>{e.fecha}</td>
        <td>
          {/* Buscar el vehículo que corresponde al vehiculo_id del estado actual */}
          {vehiculos.find(v => v.id === e.vehiculo_id)?.patente || 'No disponible'}
        </td>
        <td>
          <Button variant="warning" onClick={() => aplicarModificacion(e)}>Editar Estado</Button>
          <Button variant="danger" onClick={() => eliminarEstado(e.id)}>Eliminar estado</Button>
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
}

export default EstadoComponent;
