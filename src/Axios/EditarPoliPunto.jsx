import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';


function MostrarPuntos() {
  const [puntos, setPuntos] = useState([]);
  const [poligonos, setPoligonos] = useState([]);
  const [editData, setEditData] = useState([]);

  useEffect(() => {
    // Obtener los puntos al cargar el componente
    axios.get('http://localhost/Tracelink/poligonos/MostrarPunto.php')
      .then(response => {
        setPuntos(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Obtener los polígonos al cargar el componente
    axios.get('http://localhost/Tracelink/poligonos/MostrarPoligonos.php')
      .then(response => {
        setPoligonos(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleEditarPunto = (idPuntos) => {
    console.log("Intentando modificar cita con ID:", idPuntos);
    const PoliPuntos = idPuntos.find(c => c.idPuntos === idPuntos);
    const editItem = editData.find(item => item.idPuntos === idPuntos);
    if (editItem) {
      // Buscar el ID del polígono basado en el nombre
      const poligono = poligonos.find(p => p.nombre === editItem.Poligono_idPoligono);
      if (poligono) {
        editItem.Poligono_idPoligono = poligono.idPoligono;
      }

      axios.post('http://localhost/Tracelink/poligonos/EditarPoliPunto.php', editItem)
        .then(response => {
          alert(response.data.message);
          setEditData(editData.filter(item => item.idPuntos !== idPuntos)); // Remove item from editData after it's been updated
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleInputChange = (idPuntos, field, value) => {
    setEditData(prevEditData => {
      let editItem = prevEditData.find(item => item.idPuntos === idPuntos);
      if (editItem) {
        if (field === 'Poligono_idPoligono') {
          // Si se está cambiando el polígono, guardar el nombre en lugar del ID
          const poligono = poligonos.find(p => p.idPoligono === value);
          if (poligono) {
            editItem[field] = poligono.nombre;
          }
        } else {
          editItem[field] = value;
        }
      } else {
        editItem = { idPuntos, [field]: value };
        prevEditData.push(editItem);
      }
      return [...prevEditData];
    });
  };

  return (
      <div>
        <Navbar/>
      <h1>Puntos</h1>
      <table>
        <thead>
          <tr>
            <th>idPuntos</th>
            <th>Longitud</th>
            <th>Latitud</th>
            <th>Nombre del Polígono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {puntos.map((punto, index) => (
            <tr key={index}>
              <td>{punto.idPuntos}</td>
              <td><input type="text" defaultValue={punto.Longitud} onBlur={(e) => handleInputChange(punto.idPuntos, 'Longitud', e.target.value)} /></td>
              <td><input type="text" defaultValue={punto.Latitud} onBlur={(e) => handleInputChange(punto.idPuntos, 'Latitud', e.target.value)} /></td>
              <td>
                <select defaultValue={punto.Poligono_idPoligono} onBlur={(e) => handleInputChange(punto.idPuntos, 'Poligono_idPoligono', e.target.value)}>
                  {poligonos.map((poligono, index) => (
                    <option key={index} value={poligono.idPoligono}>{poligono.nombre}</option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleEditarPunto(punto.idPuntos)}>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostrarPuntos;