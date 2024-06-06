
import React, { useState } from 'react';
import '../stylesheets/AgregarObjetos.css';
import Navbar from './Navbar'; // Importa el componente Navbar

function AgregarObjeto() {
    
  const [objetos, setObjetos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', altura: '', ancho: '' });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarAgregar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '') {
      alert('El nombre del objeto no puede estar vacío');
      return;
    }

    setFormulario({ nombre: '', altura: '', ancho: '' });
    setObjetos([...objetos, formulario]);
  };

  const manejarBuscar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '') {
      alert('Por favor, introduce un nombre para buscar');
      return;
    }

    const objetoEncontrado = objetos.find(objeto => objeto.nombre === formulario.nombre); 

    if (objetoEncontrado) {
      alert(`Objeto encontrado: ${objetoEncontrado.nombre}, Altura: ${objetoEncontrado.altura}, Ancho: ${objetoEncontrado.ancho}`);
      setFormulario({ ...formulario, ...objetoEncontrado});
  
    } else {
      alert('Objeto no encontrado');
    }
  };

  const manejarEditar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '' || formulario.altura === '' || formulario.ancho === '') {
      alert('Todos los campos deben estar llenos para editar un objeto');
      return;
    }

    const indice = objetos.findIndex(objeto => objeto.nombre === formulario.nombre);

    if (indice !== -1) {
      const nuevosObjetos = [...objetos];
      nuevosObjetos[indice] = formulario;
      setObjetos(nuevosObjetos);
      alert('Objeto editado con éxito');
    } else {
      alert('Objeto no encontrado');
    }
  };

  const manejarBorrar = (e) => {
    e.preventDefault();
    setObjetos(objetos.filter(objeto => objeto.nombre !== formulario.nombre));
  };

  return (
    <div>
      <Navbar /> {/* Incluye el Navbar aquí */}

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
        <button type="button" onClick={manejarAgregar}>Agregar objeto</button>
        <button type="button" onClick={manejarBuscar}>Buscar objeto</button>
        <button type="button" onClick={manejarEditar}>Editar objeto</button>
        <button type="button" onClick={manejarBorrar}>Borrar objeto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre del objeto</th>
            <th>Altura</th>
            <th>Ancho</th>
          </tr>
        </thead>
        <tbody>
          {objetos.map((objeto, indice) => (
            <tr key={indice}>
              <td>{objeto.nombre}</td>
              <td>{objeto.altura}</td>
              <td>{objeto.ancho}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgregarObjeto;
import React, { useState } from 'react';
import '../stylesheets/AgregarObjetos.css';
import Navbar from './Navbar'; // Importa el componente Navbar

function AgregarObjeto() {
    
  const [objetos, setObjetos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', altura: '', ancho: '' });

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarAgregar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '') {
      alert('El nombre del objeto no puede estar vacío');
      return;
    }

    setFormulario({ nombre: '', altura: '', ancho: '' });
    setObjetos([...objetos, formulario]);
  };

  const manejarBuscar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '') {
      alert('Por favor, introduce un nombre para buscar');
      return;
    }

    const objetoEncontrado = objetos.find(objeto => objeto.nombre === formulario.nombre); 

    if (objetoEncontrado) {
      alert(`Objeto encontrado: ${objetoEncontrado.nombre}, Altura: ${objetoEncontrado.altura}, Ancho: ${objetoEncontrado.ancho}`);
      setFormulario({ ...formulario, ...objetoEncontrado});
  
    } else {
      alert('Objeto no encontrado');
    }
  };

  const manejarEditar = (e) => {
    e.preventDefault();

    if (formulario.nombre === '' || formulario.altura === '' || formulario.ancho === '') {
      alert('Todos los campos deben estar llenos para editar un objeto');
      return;
    }

    const indice = objetos.findIndex(objeto => objeto.nombre === formulario.nombre);

    if (indice !== -1) {
      const nuevosObjetos = [...objetos];
      nuevosObjetos[indice] = formulario;
      setObjetos(nuevosObjetos);
      alert('Objeto editado con éxito');
    } else {
      alert('Objeto no encontrado');
    }
  };

  const manejarBorrar = (e) => {
    e.preventDefault();
    setObjetos(objetos.filter(objeto => objeto.nombre !== formulario.nombre));
  };

  return (
    <div>
      <Navbar /> {/* Incluye el Navbar aquí */}

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
        <button type="button" onClick={manejarAgregar}>Agregar objeto</button>
        <button type="button" onClick={manejarBuscar}>Buscar objeto</button>
        <button type="button" onClick={manejarEditar}>Editar objeto</button>
        <button type="button" onClick={manejarBorrar}>Borrar objeto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre del objeto</th>
            <th>Altura</th>
            <th>Ancho</th>
          </tr>
        </thead>
        <tbody>
          {objetos.map((objeto, indice) => (
            <tr key={indice}>
              <td>{objeto.nombre}</td>
              <td>{objeto.altura}</td>
              <td>{objeto.ancho}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgregarObjeto;
