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

if (!empty($data['id']) && !empty($data['nombre_mecanico']) && !empty($data['fecha']) && !empty($data['hora']) && !empty($data['descripcion'])) {
    $id = $data['id'];
    $nombre_mecanico = $data['nombre_mecanico'];
    $fecha = $data['fecha'];
    $hora = $data['hora'];
    $descripcion = $data['descripcion'];

    // Consulta para actualizar la cita usando consultas preparadas
    $stmt = $conn->prepare("UPDATE citas SET nombre_mecanico=?, fecha=?, hora=?, descripcion=? WHERE id=?");
    $stmt->bind_param("ssssi", $nombre_mecanico, $fecha, $hora, $descripcion, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Cita actualizada correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar cita: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
}

$conn->close();
?>
