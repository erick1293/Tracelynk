import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import axios from './axiosConfig';

// Componente para agregar, editar y eliminar mecánicos
function AgregarMecanico() {
  // Definición de estados utilizando useState
  const [mecanicos, setMecanicos] = useState([]); // Estado para almacenar la lista de mecánicos
  const [filtro, setFiltro] = useState(''); // Estado para el filtro de búsqueda

  // Función para ordenar los mecánicos por nombre
  const ordenarMecanicosPorNombre = () => {
    setMecanicos([...mecanicos.sort((a, b) => a.nombre.localeCompare(b.nombre))]);
  };

  // useEffect para obtener la lista de mecánicos al montar el componente
  useEffect(() => {
    axios.get('http://localhost/Tracelink/Mecanicos/obtenerMecanicos.php')
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


 

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de Taller Mecanico</th>
            <th>Direccion</th>
            <th>RUT Empresa</th>
            <th>Descripcion</th>
           
          </tr>
        </thead>
        <tbody>
          {mecanicosFiltrados.map(m => (
            <tr key={m.idMecanico}>
              <td>{m.nombre}</td>
              <td>{m.apellido}</td>
              <td>{m.rut}</td>
              <td>{m.especialidad}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>

 
    </div>
  );
}

export default AgregarMecanico;
