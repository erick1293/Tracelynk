import React, { useState } from 'react';
import '../stylesheets/AgregarObjetos.css';

function AgregarObjeto() {
    
  // `objetos` es un array que almacena todos los objetos que se han agregado.
  // `setObjetos` es la función que usamos para actualizar el array de objetos.
  const [objetos, setObjetos] = useState([]);

  // `formulario` es un objeto que almacena los valores actuales del formulario.
  // `setFormulario` es la función que usamos para actualizar los valores del formulario.
  const [formulario, setFormulario] = useState({ nombre: '', altura: '', ancho: '' });

  // `manejarCambio` es la función que se llama cada vez que cambia el valor de un input del formulario.
  // Actualiza el valor correspondiente en el estado del formulario.
  const manejarCambio = (e) => {
    // actualiza solo lo que se le cambio
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  // `manejarAgregar` es la función que se llama cuando se presiona el botón de agregar.
  // Agrega el objeto actual del formulario al array de objetos y limpia el formulario.
  const manejarAgregar = (e) => {
    // permite que no se recarge al precional el boton 
    e.preventDefault();
// valido que este vacio para mandar un alert
    if (formulario.nombre === '') {
        // mando un alert
      alert('El nombre del objeto no puede estar vacío');
      return;
    }

    // estoy cambiando el estado de formulario a uno nuevo para asi guardarlo en Objetos
    setFormulario({ nombre: '', altura: '', ancho: '' });
        // estoy agregando un objeto nuevo al array 
        setObjetos([...objetos, formulario]);
  };

  // `manejarBuscar` es la función que se llama cuando se presiona el botón de buscar.
  // Busca el objeto con el nombre ingresado en el formulario en el array de objetos.
  const manejarBuscar = (e) => {
    // evito que se actualize la pagina
    e.preventDefault();
    //valido que el bormulario . nombre no este vacio, si es asi mando alerta
    if (formulario.nombre === '') {
      alert('Por favor, introduce un nombre para buscar');
      return;
    }
    // creo un const de objeto en contrado
    // utilizo el objetos.find para encontrar el primero elemento de una array, valido objeto.nombre sea igual al del formulario si es asi se guarda en objeto encontrado
    const objetoEncontrado = objetos.find(objeto => objeto.nombre === formulario.nombre); 
    // valido valido el objeto encontrado sea distinto a vacio
    if (objetoEncontrado) {
        // muesto el objeto con sus otras caracteristicas 
      alert(`Objeto encontrado: ${objetoEncontrado.nombre}, Altura: ${objetoEncontrado.altura}, Ancho: ${objetoEncontrado.ancho}`);
      //desgloso el formulario con los 3. y lo meto en un objeto encontrado, a formulario le estoy pasando objeto encontrado
      setFormulario({ ...formulario, ...objetoEncontrado});
  
    } else {
      alert('Objeto no encontrado');
    }
  };

  // `manejarEditar` es la función que se llama cuando se presiona el botón de editar.
// Edita el objeto con el nombre ingresado en el formulario en el array de objetos.
const manejarEditar = (e) => {
    // evito que se refresque la pag
    e.preventDefault();
// valido que nombre, altura y ancho no esten vacios
    if (formulario.nombre === '' || formulario.altura === '' || formulario.ancho === '') {
      alert('Todos los campos deben estar llenos para editar un objeto');
      return;
    }
// creo una const con indice validando que indice encontro el nombre de lo que quiero editar de lo contrario almacena -1
    const indice = objetos.findIndex(objeto => objeto.nombre === formulario.nombre);
    // valido que indice sea distinto a -1, guardo en indice la pocicion del array
    if (indice !== -1) {
        // creo una copia en nuevos Objetos con ...Objetos que objetos es un array 
      const nuevosObjetos = [...objetos];
      // reemplazo el objeto o lo que cambie del objeto en el (indice):posicion del array en que se encuentra  del array 
      nuevosObjetos[indice] = formulario;
      // cambio el estado de OBjetos pasandole el estado del NuevosObjetos
      setObjetos(nuevosObjetos);
      alert('Objeto editado con éxito');
      // de lo contrario muestro un no se encontro el objeto
    } else {
      alert('Objeto no encontrado');
    }
  };

  // `manejarBorrar` es la función que se llama cuando se presiona el botón de borrar.
  // Borra el objeto con el nombre ingresado en el formulario del array de objetos.
  const manejarBorrar = (e) => {
    e.preventDefault();
    // esta linea filtra mediante filter recargando los objetos pasandole nuevamente todos los objetos sin pasar el que tenemos en el textfiel nombre
    setObjetos(objetos.filter(objeto => objeto.nombre !== formulario.nombre));
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
