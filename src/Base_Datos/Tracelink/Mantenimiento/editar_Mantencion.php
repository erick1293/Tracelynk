<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Verificar el método de la solicitud
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Solicitud no válida. Se requiere método POST"]);
    exit;
}

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Error en la conexión a la base de datos: " . $conn->connect_error]);
    exit;
}

// Obtención de datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Log para verificar los datos recibidos
error_log(print_r($data, true));

if (!empty($data['idMantencion']) && !empty($data['idCita']) && !empty($data['idVehiculo']) && !empty($data['fecha']) && !empty($data['descripcion'])) {
    $idMantencion = $data['idMantencion'];
    $citas_idcitas = $data['idCita'];
    $vehiculos_id = $data['idVehiculo'];
    $fecha = $data['fecha'];
    $descripcion = $data['descripcion'];

    // Consulta para actualizar la mantención usando consultas preparadas
    $stmt = $conn->prepare("UPDATE mantenciones SET citas_idcitas=?, vehiculos_id=?, fecha=?, descripcion=? WHERE idMantencion=?");
    $stmt->bind_param("iissi", $citas_idcitas, $vehiculos_id, $fecha, $descripcion, $idMantencion);
    

    if ($stmt->execute()) {
        echo json_encode(["message" => "Mantención actualizada correctamente", "data" => $data]); // Agrega esta línea para enviar la respuesta al cliente
    } else {
        echo json_encode(["error" => "Error al actualizar mantención: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
}

$conn->close();
?>
