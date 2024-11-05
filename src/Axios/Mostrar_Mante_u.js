import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Mostrar_mante() {
    const [datosMantencion, setDatosMantencion] = useState([]);
    const [citasDisponibles, setCitasDisponibles] = useState([]);
    const [citas, setCitas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [mecanicos, setMecanicos] = useState([]);
    const [nuevoMantenimiento, setNuevoMantenimiento] = useState({
        idCita: '',
        vehiculo_id: '',
        fecha: '',
        descripcion: ''
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [mantencionSeleccionada, setMantencionSeleccionada] = useState(null);
    const [editarMantenimiento, setEditarMantenimiento] = useState({
        idCita: '',
        vehiculo_id: '',
        fecha: '',
        descripcion: ''
    });

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            await cargarMecanicos();
            await cargarDatosMantencion();
            await cargarCitas();
            await cargarVehiculos();
        };
        cargarDatosIniciales();
    }, []);
    const cargarDatosMantencion = async () => {
        try {
            const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/dato.php');
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setDatosMantencion(response.data.mantenciones);
        } catch (error) {
            console.error('Error al obtener los datos de mantención:', error);
            setError('Error al obtener los datos de mantención: ' + error.message);
        }
    };

    const cargarCitas = async () => {
        try {
            const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/obtener_citas.php');
            setCitas(response.data);
        } catch (error) {
            console.error('Error al obtener los datos de citas:', error);
            setError('Error al obtener los datos de citas.');
        }
    };

    const cargarVehiculos = async () => {
        try {
            const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/Vehiculos.php');
            setVehiculos(response.data);
        } catch (error) {
            console.error('Error al obtener los datos de vehículos:', error);
            setError('Error al obtener los datos de vehículos.');
        }
    };

    const cargarMecanicos = async () => {
        try {
            const response = await axios.get('http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/obtenerMecanicos.php');
            setMecanicos(response.data);
        } catch (error) {
            console.error('Error al obtener los datos de mecánicos:', error);
            setError('Error al obtener los datos de mecánicos.');
        }
    };
    const cargarCitasDisponibles = async (idCita, fecha) => {
        try {
            const response = await axios.get(`http://ec2-54-221-134-204.compute-1.amazonaws.com/Mantenimiento/obtener_citas.php?idCita=${idCita}&fecha`);
            setCitasDisponibles(response.data);
        } catch (error) {
            console.error('Error al obtener las citas disponibles:', error);
        }
    };
    const descargarPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['ID', 'Fecha', 'Descripción', 'Patente Vehículo']],
            body: datosMantencion.map(mantencion => [
                mantencion.idMantencion,
                mantencion.fecha,
                mantencion.descripcion,
                mantencion.patente
            ])
        });
        doc.save('lista_mantenciones.pdf');
    };
    return ( 
         <div>
             
    <h2>Lista de Mantenciones</h2>
    <Button variant="secondary" onClick={descargarPDF}>Descargar PDF</Button>
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Patente vehiculo</th>
           
            </tr>
        </thead>
        <tbody>
            {datosMantencion.map((mantencion) => (
                <tr key={mantencion.idMantencion}>
                    <td>{mantencion.idMantencion}</td>
                    <td>{mantencion.fecha}</td>
                    <td>{mantencion.descripcion}</td>
                    <td>{mantencion.patente}</td>
                    
                </tr>
            ))}
        </tbody>
    </Table>
            </div>
    ); };
export default Mostrar_mante;