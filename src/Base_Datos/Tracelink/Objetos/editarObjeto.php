<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



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

if (!empty(!empty($data['id']) && $data['nombre']) && !empty($data['altura']) && !empty($data['ancho']) && !empty($data['vehiculo_id'])) {
    $id = $data['id'];
    $nombre = $data['nombre'];
    $altura = $data['altura'];
    $ancho = $data['ancho'];
    $vehiculo_id = $data['vehiculo_id'];

    $stmt = $conn->prepare("UPDATE carga SET nombre=?, altura=?, ancho=?, vehiculo_id=? WHERE id=?");
    $stmt->bind_param("sssii", $nombre, $altura, $ancho, $vehiculo_id, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Carga  actualizada correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar cita: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
}

$conn->close();
?>
