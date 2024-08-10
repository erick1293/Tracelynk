import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from "../components/Navbar";

function Vehiculos({ userRole }) {  // Añade userRole como prop
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosMantenimiento, setVehiculosMantenimiento] = useState([]);

  useEffect(() => {
    // Obtener los datos de los vehículos al cargar el componente
    axios.get('http://localhost/Tracelink/vehiculo/conexion.php')
      .then(response => {
        setVehiculos(response.data);
        // Filtrar vehículos con kilometraje actual mayor al inicial
        const vehiculosParaMantenimiento = response.data.filter(
          vehiculo => parseInt(vehiculo.kilometrajeactual) > parseInt(vehiculo.kilometrajeinicial)
        );
        setVehiculosMantenimiento(vehiculosParaMantenimiento);
      })
      .catch(error => {
        console.error('Error al obtener los vehículos:', error);
      });
  }, []);

    const redireccionarAMantenimiento = () => {
      console.log('Redireccionando a la página de Agendar Cita...');
      window.location.href = 'http://localhost:3000/AgendarCita';
    };

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Marca', 'Modelo', 'Año', 'Patente', 'Kilometraje Inicial', 'Kilometraje Actual']],
      body: vehiculosMantenimiento.map(vehiculo => [
        vehiculo.marca,
        vehiculo.modelo,
        vehiculo.anio,
        vehiculo.patente,
        vehiculo.kilometrajeinicial,
        vehiculo.kilometrajeactual
      ])
    });
    doc.save('vehiculos_mantenimiento.pdf');
  };

  const enviarCorreo = () => {
    console.log('Enviando correo con los siguientes vehículos:', vehiculosMantenimiento);
    axios.post('http://localhost/Tracelink/Alertas/EnviarCorreoVehiculos.php', vehiculosMantenimiento)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error al enviar el correo:', error);
      });
  };

  return (
    <div>
      <h1>Alertas de Vehiculos con exceso de Kilometraje</h1>
      {vehiculosMantenimiento.length > 0 ? (
        <div>
          <button onClick={descargarPDF}>Descargar PDF</button>
          <table>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Patente</th>
                <th>Kilometraje Inicial</th>
                <th>Kilometraje Actual</th>
              </tr>
            </thead>
            <tbody>
              {vehiculosMantenimiento.map((vehiculo, index) => (
                <tr key={index}>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.anio}</td>
                  <td>{vehiculo.patente}</td>
                  <td>{vehiculo.kilometrajeinicial}</td>
                  <td>{vehiculo.kilometrajeactual}</td>
                </tr>
              ))}
            </tbody>
          </table>
            {(userRole === 1 || userRole === 3) && (  // Mostrar botones solo para administrador o secretario
              <>
              <button onClick={redireccionarAMantenimiento}>
                Agendar Cita para Mantenimiento
              </button>
              <button onClick={enviarCorreo}>Enviar Correo</button>
            </>
          )}
        </div>
      ) : (
        <p>No hay vehículos que necesiten mantenimiento.</p>
      )}
    </div>
  );
}

export default Vehiculos;
