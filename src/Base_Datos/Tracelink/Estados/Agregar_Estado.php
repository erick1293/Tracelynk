<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

// Decodificar datos recibidos
$data = json_decode(file_get_contents('php://input'), true);

// Verificar datos necesarios
if (isset($data['estado']) && isset($data['fecha'])) {
    $estado = $data['estado'];
    $fecha = $data['fecha'];

    $insertQuery = "INSERT INTO estado (estado, fecha) VALUES (?, ?)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("ss", $estado, $fecha);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Estado agregado correctamente.", "idEstado" => $stmt->insert_id]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Todos los campos son obligatorios."]);
}

$conn->close();
?>
