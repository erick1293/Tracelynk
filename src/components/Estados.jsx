
import { useState } from "react";
// importo el use state que me servira para cambiar el estado del componente 
// importo uuidv4 que sirve para poder modificar directo desde un boton para modificar todo menos el id 
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';

function EstadoComponent() {
    // vtro un array estado con set estados
    const [estados, setEstados] = useState([]);
    // almaceno el estado actual , en un objeto, id, estado, fecha
    const [nuevoEstado, setNuevoEstado] = useState({ id: '', estado: '', fecha: '' });
    // creo un modificar estado
    const [estadoAModificar, setEstadoAModificar] = useState(null);
  
    //creo la funcion agregar estado 
    function agregarEstado() {
        // valido que el objeto no este vacio
      if (nuevoEstado.estado) {
        // modifico estados pasandole a estados el nuevoestado
        setEstados([...estados, { ...nuevoEstado, id: uuidv4() }]);
        // paso vacio a nuevoestado
        setNuevoEstado({ id: '', estado: '', fecha: '' });
      } else {
        alert('Por favor, rellene el campo de estado antes de agregar un nuevo estado.');
      }
    }
  //creo la funcion modificar  pasando id
    function prepararModificacion(id) {
        // find recorre cara parte del array estado, comparando estado.id
        //a comparo que el estado.id sea igual al id
      const estado = estados.find(estado => estado.id === id);
      // midivico el el setestadoamodificar pasandole estado
      setEstadoAModificar(estado);
      // modifico el estado de nuevo estado pasandole estado
      setNuevoEstado(estado);
    }
  
    function aplicarModificacion() {
        //valido estadoamodificar y nuevoestado.estado 
      if (estadoAModificar && nuevoEstado.estado) {
        // ocupo funcion flecha 
        //verifico que el id sea igual que el id del estadoamodificar.id 
        const nuevosEstados = estados.map(estado => estado.id === estadoAModificar.id ? nuevoEstado : estado);
        // modifico el estadoos pasandole nuevosestados
        setEstados(nuevosEstados);
        // modifico el set estadoamodificar dejandolo null
        setEstadoAModificar(null);
        // modifico el setnuevoestado a vacio
        setNuevoEstado({ id: '', estado: '', fecha: '' });
      }
    }
  //creo la funcion eliminar pasando el id 
    function eliminarEstado(id) {
        // guardo en nuevosestados filtrando la id de estado.id que sea igual al id
      const nuevosEstados = estados.filter(estado => estado.id !== id);
      setEstados(nuevosEstados);
    }
  
    return (
      <div>
        <Navbar /> 
        <form onSubmit={function(e) { e.preventDefault(); estadoAModificar ? aplicarModificacion() : agregarEstado(); }}>
          <input type="text" placeholder="Estado" value={nuevoEstado.estado} onChange={function(e) { setNuevoEstado({ ...nuevoEstado, estado: e.target.value }) }} required />
          <input type="datetime-local" value={nuevoEstado.fecha} onChange={function(e) { setNuevoEstado({ ...nuevoEstado, fecha: e.target.value }) }} />
          <button type="submit">{estadoAModificar ? 'Modificar' : 'Agregar'}</button>
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
            {estados.map(function(estado) {
              return (
                <tr key={estado.id}>
                  <td>{estado.estado}</td>
                  <td>{estado.fecha}</td>
                  <td>
                    <button onClick={function() { prepararModificacion(estado.id) }}>Modificar</button>
                    <button onClick={function() { eliminarEstado(estado.id) }}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

import { useState } from "react";
// importo el use state que me servira para cambiar el estado del componente 
// importo uuidv4 que sirve para poder modificar directo desde un boton para modificar todo menos el id 
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';

function EstadoComponent() {
    // vtro un array estado con set estados
    const [estados, setEstados] = useState([]);
    // almaceno el estado actual , en un objeto, id, estado, fecha
    const [nuevoEstado, setNuevoEstado] = useState({ id: '', estado: '', fecha: '' });
    // creo un modificar estado
    const [estadoAModificar, setEstadoAModificar] = useState(null);
  
    //creo la funcion agregar estado 
    function agregarEstado() {
        // valido que el objeto no este vacio
      if (nuevoEstado.estado) {
        // modifico estados pasandole a estados el nuevoestado
        setEstados([...estados, { ...nuevoEstado, id: uuidv4() }]);
        // paso vacio a nuevoestado
        setNuevoEstado({ id: '', estado: '', fecha: '' });
      } else {
        alert('Por favor, rellene el campo de estado antes de agregar un nuevo estado.');
      }
    }
  //creo la funcion modificar  pasando id
    function prepararModificacion(id) {
        // find recorre cara parte del array estado, comparando estado.id
        //a comparo que el estado.id sea igual al id
      const estado = estados.find(estado => estado.id === id);
      // midivico el el setestadoamodificar pasandole estado
      setEstadoAModificar(estado);
      // modifico el estado de nuevo estado pasandole estado
      setNuevoEstado(estado);
    }
  
    function aplicarModificacion() {
        //valido estadoamodificar y nuevoestado.estado 
      if (estadoAModificar && nuevoEstado.estado) {
        // ocupo funcion flecha 
        //verifico que el id sea igual que el id del estadoamodificar.id 
        const nuevosEstados = estados.map(estado => estado.id === estadoAModificar.id ? nuevoEstado : estado);
        // modifico el estadoos pasandole nuevosestados
        setEstados(nuevosEstados);
        // modifico el set estadoamodificar dejandolo null
        setEstadoAModificar(null);
        // modifico el setnuevoestado a vacio
        setNuevoEstado({ id: '', estado: '', fecha: '' });
      }
    }
  //creo la funcion eliminar pasando el id 
    function eliminarEstado(id) {
        // guardo en nuevosestados filtrando la id de estado.id que sea igual al id
      const nuevosEstados = estados.filter(estado => estado.id !== id);
      setEstados(nuevosEstados);
    }
  
    return (
      <div>
        <Navbar /> 
        <form onSubmit={function(e) { e.preventDefault(); estadoAModificar ? aplicarModificacion() : agregarEstado(); }}>
          <input type="text" placeholder="Estado" value={nuevoEstado.estado} onChange={function(e) { setNuevoEstado({ ...nuevoEstado, estado: e.target.value }) }} required />
          <input type="datetime-local" value={nuevoEstado.fecha} onChange={function(e) { setNuevoEstado({ ...nuevoEstado, fecha: e.target.value }) }} />
          <button type="submit">{estadoAModificar ? 'Modificar' : 'Agregar'}</button>
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
            {estados.map(function(estado) {
              return (
                <tr key={estado.id}>
                  <td>{estado.estado}</td>
                  <td>{estado.fecha}</td>
                  <td>
                    <button onClick={function() { prepararModificacion(estado.id) }}>Modificar</button>
                    <button onClick={function() { eliminarEstado(estado.id) }}>Eliminar</button>
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