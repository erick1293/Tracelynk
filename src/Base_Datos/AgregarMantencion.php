<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos"; // Asegúrate de cambiar esto por el nombre de tu base de datos real

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Obtención de datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos necesarios están presentes
if (empty($data['cita_id']) || empty($data['fecha']) || empty($data['descripcion'])) {
    http_response_code(400);
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    exit();
}

// Preparar la consulta
$stmt = $conn->prepare("INSERT INTO mantenimiento (cita_id, fecha, descripcion) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $data['cita_id'], $data['fecha'], $data['descripcion']);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(["message" => "Mantenimiento agregado correctamente"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al agregar mantenimiento: " . $stmt->error]);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
?><?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mantenimientos_db"; // Asegúrate de cambiar esto por el nombre de tu base de datos real

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Obtención de datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos necesarios están presentes
if (empty($data['cita_id']) || empty($data['fecha']) || empty($data['descripcion'])) {
    http_response_code(400);
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    exit();
}

// Preparar la consulta
$stmt = $conn->prepare("INSERT INTO mantenimiento (cita_id, fecha, descripcion) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $data['cita_id'], $data['fecha'], $data['descripcion']);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(["message" => "Mantenimiento agregado correctamente"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al agregar mantenimiento: " . $stmt->error]);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
?>