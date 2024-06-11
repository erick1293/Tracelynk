<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Incluir el archivo de conexión
include_once 'conection.php';

// Conexión a la base de datos
$conn = conectar();

// Consulta para seleccionar los datos de la tabla "citas"
$sqlSelect = "SELECT id, nombre_mecanico, fecha, hora, descripcion FROM citas";

$resultado = $conn->query($sqlSelect);

// Array para almacenar los datos de las citas
$citas = array();

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $idCita = $fila['id'];
        
        // Consulta para obtener los detalles de la mantención y el vehículo asociado utilizando el ID de la cita
        $sqlMantencionVehiculo = "SELECT m.fecha, m.descripcion, v.id, v.marca, v.modelo, v.anio, v.transmision, v.patente, v.kilometrajeinicial, v.kilometrajeactual, v.Estado 
                                 FROM mantenciones m 
                                 JOIN vehiculo v ON m.vehiculos_id   = v.id
                                 WHERE m.citas_idcitas = $idCita";

        $resultadoMantencionVehiculo = $conn->query($sqlMantencionVehiculo);

        // Array para almacenar los datos de la mantención y el vehículo asociado
        $datosMantencionVehiculo = array();

        if ($resultadoMantencionVehiculo->num_rows > 0) {
            while ($filaMV = $resultadoMantencionVehiculo->fetch_assoc()) {
                $datosMantencionVehiculo[] = $filaMV;
            }
        }

        // Agregar datos de la cita y la mantención/vehículo asociado al array de citas
        $citas[] = array(
            'id' => $fila['id'],
            'nombre_mecanico' => $fila['nombre_mecanico'],
            'fecha' => $fila['fecha'],
            'hora' => $fila['hora'],
            'descripcion' => $fila['descripcion'],
            'mantencionVehiculo' => $datosMantencionVehiculo
        );
    }
}

// Enviar respuesta en formato JSON
echo json_encode($citas);

// Cerrar conexión
$conn->close();
?>
