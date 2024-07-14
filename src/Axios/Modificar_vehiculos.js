import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const Vehiculos = ({ userRole }) => {
    const [data, setData] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [Estado, setEstado] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
    const [editando, setEditando] = useState(false);
    const [nuevoVehiculo, setNuevoVehiculo] = useState({
        id: '',
        marca: '',
        modelo: '',
        anio: '',
        transmision: '',
        patente: '',
        kilometrajeinicial: '',
        kilometrajeactual: '',
        idEstado: ''
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
        fetchMarcas();
        fetchEstados(); 
    }, []);

    useEffect(() => {
        if (nuevoVehiculo.marca) {
            fetchModelos(nuevoVehiculo.marca);
        }
    }, [nuevoVehiculo.marca]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/conexion.php');
            setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const handleDelete = async (vehiculoId) => {
        try {
            const response = await axios.post('http://localhost/Tracelink/vehiculo/eliminar_vehiculo.php', { id: vehiculoId });
            alert(response.data.message); // Mostrar mensaje de éxito o error
            // Actualizar la lista de vehículos después de eliminar
            fetchData();
        } catch (error) {
            console.error('Error al eliminar vehículo:', error);
            alert('Error al eliminar vehículo: ' + error.message);
        }
    };

    const fetchMarcas = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/vehiculo/obtener_marcas.php');
            setMarcas(response.data);
        } catch (error) {
            console.error('Error al obtener marcas:', error);
        }
    };

    const fetchModelos = async (marcaId) => {
        try {
            const response = await axios.get(`http://localhost/Tracelink/vehiculo/obtener_modelos.php?marca=${marcaId}`);
            setModelos(response.data);
        } catch (error) {
            console.error('Error al obtener modelos:', error);
        }
    };

    const fetchEstados = async () => {
        try {
            const response = await axios.get('http://localhost/Tracelink/vehiculo/obtener_Estado.php');
            setEstado(response.data);
        } catch (error) {
            console.error('Error al obtener Estados:', error);
        }
    };

    const handleModificar = (vehiculoId) => {
        const vehiculo = data.find(v => v.id === vehiculoId);
        if (vehiculo) {
            setVehiculoSeleccionado(vehiculo);
            setNuevoVehiculo({
                id: vehiculo.id,
                marca: vehiculo.marca,
                modelo: vehiculo.modelo,
                anio: vehiculo.anio,
                transmision: vehiculo.transmision,
                patente: vehiculo.patente,
                kilometrajeinicial: vehiculo.kilometrajeinicial,
                kilometrajeactual: vehiculo.kilometrajeactual,
                idEstado: vehiculo.idEstado
            });
            setEditando(true);
            setShowModal(true);
        } else {
            console.error('Vehículo no encontrado:', vehiculoId);
        }
    };

    const handleEditar = (e) => {
        const { name, value } = e.target;
        setNuevoVehiculo(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Editando campo ${name}: ${value}`);  // Debug
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Nuevo vehículo:", nuevoVehiculo); // Agregar este console.log para ver el estado actual de nuevoVehiculo
        try {
            const response = await axios.post('http://localhost/Tracelink/vehiculo/editar_vehiculo.php', nuevoVehiculo);
            console.log("Respuesta del servidor:", response.data);
            alert(response.data.message); // Mostrar mensaje de éxito o error
            // Actualizar la lista de vehículos después de editar
            fetchData();
            // Restaurar el estado de edición y cerrar el modal
            setEditando(false);
            setShowModal(false);
            setVehiculoSeleccionado(null);
            setNuevoVehiculo({
                id: '',
                marca: '',
                modelo: '',
                anio: '',
                transmision: '',
                patente: '',
                kilometrajeinicial: '',
                kilometrajeactual: '',
                idEstado: ''
            });
        } catch (error) {
            console.error('Error al editar vehículo:', error);
            alert('Error al editar vehículo: ' + error.message);
        }
    };

    const handleModeloChange = (e) => {
        const modelo = e.target.value;
        setNuevoVehiculo(prevState => ({
            ...prevState,
            modelo: modelo
        }));
    };

    const handleEstado = (e) => {
        const idEstado = e.target.value;
        setNuevoVehiculo(prevState => ({
            ...prevState,
            idEstado: idEstado
        }));
    };

    const handleBuscar = (e) => {
        setFiltro(e.target.value);
    };

    const mapEstado = (idEstado) => {
        const estado = Estado.find(e => e.idEstado === idEstado);
        return estado ? estado.estado : 'mantención';
    };

    const vehiculosFiltrados = data.filter(v => {
        return v.marca.toLowerCase().includes(filtro.toLowerCase()) ||
            v.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
            v.anio.toString().includes(filtro.toLowerCase()) ||
            v.transmision.toLowerCase().includes(filtro.toLowerCase()) ||
            v.patente.toLowerCase().includes(filtro.toLowerCase()) ||
            v.id.toLowerCase().includes(filtro.toLowerCase()) ||
            v.kilometrajeinicial.toLowerCase().includes(filtro.toLowerCase()) ||
            v.kilometrajeactual.toLowerCase().includes(filtro.toLowerCase()) ||
            mapEstado(v.idEstado).toLowerCase().includes(filtro.toLowerCase());
    });

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Vehículos</h1>
            <FormControl type="text" placeholder="Buscar..." className="mb-3" onChange={handleBuscar} />
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>AÑO</th>
                        <th>Transmision</th>
                        <th>PATENTE</th>
                        <th>kilometraje Inicial</th>
                        <th>kilometraje Actual</th>
                        <th>Estado Vehiculo</th>
                        <th>  {(userRole === 1 || userRole === 3) && (
              <p> Acciones </p>  )}
              </th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculosFiltrados.map(v => (
                        <tr key={v.id}>
                            <td>{v.id}</td>
                            <td>{v.marca}</td>
                            <td>{v.modelo}</td>
                            <td>{v.anio}</td>
                            <td>{v.transmision}</td>
                            <td>{v.patente}</td>
                            <td>{v.kilometrajeinicial}</td>
                            <td>{v.kilometrajeactual}</td>
                            <td>{mapEstado(v.idEstado)}</td>
                            <td>
                            {(userRole === 1 || userRole === 3) && (
                                <>
                                <Button variant="primary" onClick={() => handleModificar(v.id)}>Modificar</Button>
                                <Button variant="danger" onClick={() => handleDelete(v.id)}>Eliminar</Button>
                                </> )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Editar Vehículo</Modal.Title>
                    <Button variant="secondary" style={{ marginRight: 'auto' }} onClick={() => setShowModal(false)}>Minimizar</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formMarca">
                            <Form.Label>Marca:</Form.Label>
                            <Form.Control as="select" name="marca" value={nuevoVehiculo.marca} onChange={handleEditar}>
                                <option value="">Seleccionar</option>
                                {Array.isArray(marcas) && marcas.map(marca => (
                                    <option key={marca.idMarca} value={marca.Nombre_marca}>{marca.Nombre_marca}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formModelo">
                            <Form.Label>Modelo:</Form.Label>
                            <Form.Control as="select" onChange={handleModeloChange} value={nuevoVehiculo.modelo} disabled={!nuevoVehiculo.marca}>
                                <option value="">Seleccionar</option>
                                {Array.isArray(modelos) && modelos.map((modelo, index) => (
                                    <option key={index} value={modelo}>{modelo}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formAnio">
                            <Form.Label>Año:</Form.Label>
                            <Form.Control type="text" name="anio" value={nuevoVehiculo.anio} onChange={handleEditar} />
                        </Form.Group>
                        <Form.Group controlId="formTransmision">
                            <Form.Label>Transmisión:</Form.Label>
                            <Form.Control as="select" name="transmision" value={nuevoVehiculo.transmision} onChange={handleEditar}>
                                  <option value="">Seleccionar</option>
                                <option value="Automatico">Automático</option>
                                <option value="Manual">Manual</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPatente">
                            <Form.Label>Patente:</Form.Label>
                            <Form.Control type="text" name="patente" value={nuevoVehiculo.patente} onChange={handleEditar} />
                        </Form.Group>
                        <Form.Group controlId="formKilometrajeinicial">
                            <Form.Label>Kilometraje Inicial:</Form.Label>
                            <Form.Control type="text" name="kilometrajeinicial" value={nuevoVehiculo.kilometrajeinicial} onChange={handleEditar} />
                        </Form.Group>
                        <Form.Group controlId="formKilometrajeactual">
                            <Form.Label>kilometraje Actual:</Form.Label>
                            <Form.Control type="text" name="kilometrajeactual" value={nuevoVehiculo.kilometrajeactual} onChange={handleEditar} />
                        </Form.Group>
                        <Form.Group controlId="formEstado">
                            <Form.Label>Estado:</Form.Label>
                            <Form.Control as="select" name="idEstado" value={nuevoVehiculo.idEstado} onChange={handleEstado}>
                                <option value="">Seleccionar</option>
                                {Array.isArray(Estado) && Estado.map(estado => (
                                    <option key={estado.idEstado} value={estado.idEstado}>{estado.estado}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">Guardar cambios</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Vehiculos;
