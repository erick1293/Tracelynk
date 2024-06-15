<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

// Obtener los datos enviados desde el cliente
$data = json_decode(file_get_contents("php://input"), true);

// Validar los datos
if (!isset($data['nombre_mecanico']) || !isset($data['mecanico_id']) || !isset($data['fecha']) || !isset($data['hora']) || !isset($data['descripcion'])) {
    die(json_encode(["success" => false, "error" => "Datos incompletos"]));
}

$nombre_mecanico = $data['nombre_mecanico'];
$mecanico_id = $data['mecanico_id'];
$fecha = $data['fecha'];
$hora = $data['hora'];
$descripcion = $data['descripcion'];

// Consulta SQL para insertar una nueva cita
$sql = "INSERT INTO citas (nombre_mecanico, mecanico_id, fecha, hora, descripcion) VALUES ('$nombre_mecanico', $mecanico_id, '$fecha', '$hora', '$descripcion')";

// Ejecutar la consulta SQL y manejar errores
if ($conn->query($sql) === TRUE) {
    // Obtener el ID de la última inserción
    $last_id = $conn->insert_id;
    echo json_encode(["success" => true, "id" => $last_id, "message" => "Cita agregada exitosamente"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $conn->error]);
}

// Cerrar la conexión
$conn->close();
?>
