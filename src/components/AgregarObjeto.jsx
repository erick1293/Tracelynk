import React, { useState, useEffect } from 'react';
import '../stylesheets/AgregarObjetos.css';
import Navbar from './Navbar'; // Importa el componente Navbar
import axios from 'axios';

function AgregarObjeto() {
  const [objetos, setObjetos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', altura: '', ancho: '' });
  const [vehiculos, setVehiculos] = useState([]);
  const [filtro, setFiltro] = useState('');

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
        c.id.toString().toLowerCase().includes(filtro.toLowerCase())||
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
        setFormulario({ nombre: '', altura: '', ancho: '' });
        setObjetos([...objetos, formulario]);
        alert('Objeto agregado con éxito');
      })
      .catch(error => console.error('Error al agregar el objeto:', error));
  };

  const manejarBuscar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '') {
      alert('Por favor, introduce un nombre para buscar');
      return;
    }

    axios.post('http://localhost/Tracelink/Objetos/buscarObjeto.php', { nombre: formulario.nombre })
      .then(response => {
        const objetoEncontrado = response.data;
        if (objetoEncontrado) {
          alert(`Objeto encontrado: ${objetoEncontrado.nombre}, Altura: ${objetoEncontrado.altura}, Ancho: ${objetoEncontrado.ancho}`);
          setFormulario({ ...formulario, ...objetoEncontrado });
        } else {
          alert('Objeto no encontrado');
        }
      })
      .catch(error => console.error('Error al buscar el objeto:', error));
  };

  const manejarEditar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '' || formulario.altura === '' || formulario.ancho === '') {
      alert('Todos los campos deben estar llenos para editar un objeto');
      return;
    }

    axios.post('http://localhost/Tracelink/Objetos/editarObjeto.php', formulario)
      .then(response => {
        const nuevosObjetos = objetos.map(obj => obj.nombre === formulario.nombre ? formulario : obj);
        setObjetos(nuevosObjetos);
        alert('Objeto editado con éxito');
      })
      .catch(error => console.error('Error al editar el objeto:', error));
  };

  const manejarBorrar = (e) => {
    e.preventDefault();

    axios.post('http://localhost/Tracelink/Objetos/borrarObjeto.php', { nombre: formulario.nombre })
      .then(response => {
        setObjetos(objetos.filter(objeto => objeto.nombre !== formulario.nombre));
        setFormulario({ nombre: '', altura: '', ancho: '' });
        alert('Objeto borrado con éxito');
      })
      .catch(error => console.error('Error al borrar el objeto:', error));
  };

  return (
    <div>
      <Navbar /> 
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
        <button type="button" onClick={manejarAgregar}>Agregar objeto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>id Carga </th>
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
        <button type="button" onClick={manejarEditar}>Editar Carga</button>
        <button type="button" onClick={manejarBorrar}>Borrar Carga</button></td>
           </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
export default AgregarObjeto;