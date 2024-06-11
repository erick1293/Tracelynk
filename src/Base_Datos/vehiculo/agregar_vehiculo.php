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
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Obtención de datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['marca']) && !empty($data['modelo']) && !empty($data['anio']) && !empty($data['transmision']) && !empty($data['patente']) && !empty($data['kilometrajeinicial']) && !empty($data['kilometrajeactual'])) {
    $marca = $data['marca'];
    $modelo = $data['modelo'];
    $anio = $data['anio'];
    $transmision = $data['transmision'];
    $patente = $data['patente'];
    $kilometrajeinicial = $data['kilometrajeinicial'];
    $kilometrajeactual = $data['kilometrajeactual'];

    // Consulta para insertar el vehículo
    $stmt = $conn->prepare("INSERT INTO vehiculo (marca, modelo, anio, transmision, patente, kilometrajeinicial, kilometrajeactual) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissii", $marca, $modelo, $anio, $transmision, $patente, $kilometrajeinicial, $kilometrajeactual);
    

    if ($stmt->execute()) {
       // echo json_encode(["success" => true, "message" => "Vehículo agregado correctamente."]);
       echo json_encode(["success" => true, "message" => "$transmision."]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Todos los campos son obligatorios."]);
}

$conn->close();
?>