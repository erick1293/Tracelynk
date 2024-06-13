import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';
import axios from 'axios';

function EstadoComponent() {
  const [estados, setEstados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState({ idEstado: '', estado: '', fecha: '' , vehiculo_id:'' });
  const [estadoAModificar, setEstadoAModificar] = useState(null);
  const [formulario, setFormulario] = useState({ vehiculo_id: '' });
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    // Obtener los vehículos al cargar el componente
    axios.get('http://localhost/Tracelink/Objetos/obtenerVehiculos.php')
      .then(response => setVehiculos(response.data))
      .catch(error => console.error('Error al obtener los vehículos:', error));
  }, []);

  const agregarEstado = (e) => {
    e.preventDefault();

    if (formulario.idEstado === '') {
      alert('El nombre del estado no puede estar vacío');
      return;
  }
  axios.post('http://localhost/Tracelink/Estados/Agregar_Estado.php', formulario)
  .then(response => {
    setFormulario({ idEstado: '', estado: '', vehiculo_id: '' });
    setEstados([...estados, { ...formulario, idEstado: response.data.idEstado}]);
    alert('Objeto agregado con éxito');
  })
  .catch(error => console.error('Error al agregar el carga:', error));
};

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
        <input type="text" placeholder="Estado" value={nuevoEstado.estado}onChange={(e) => setNuevoEstado({ ...nuevoEstado, estado: e.target.value })} />
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
          type="datetime-local"
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
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map(estado => (
            <tr key={estado.id}>
              <td>{estado.estado}</td>
              <td>{estado.fecha}</td>
              <td>
                <button onClick={() => prepararModificacion(estado.id)}>Modificar</button>
                <button onClick={() => eliminarEstado(estado.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoComponent;
