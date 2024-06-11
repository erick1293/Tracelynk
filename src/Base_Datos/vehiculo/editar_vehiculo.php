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

if (!empty($data['id']) && !empty($data['marca']) && !empty($data['modelo']) && !empty($data['anio']) && !empty($data['transmision']) && !empty($data['patente']) && !empty($data['kilometrajeinicial']) && !empty($data['kilometrajeactual'])) {
    $id = $data['id'];
    $marca = $data['marca'];
    $modelo = $data['modelo'];
    $anio = $data['anio'];
    $transmision = $data['transmision'];
    $patente = $data['patente'];
    $kilometrajeinicial = $data['kilometrajeinicial'];
    $kilometrajeactual = $data['kilometrajeactual'];

    // Consulta para actualizar el vehículo usando consultas preparadas
    $stmt = $conn->prepare("UPDATE vehiculo SET marca=?, modelo=?, anio=?, transmision=?, patente=?, kilometrajeinicial=?, kilometrajeactual=? WHERE id=?");
    $stmt->bind_param("sssssssi", $marca, $modelo, $anio, $transmision, $patente, $kilometrajeinicial, $kilometrajeactual, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Vehículo actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar vehículo: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
}

$conn->close();
?>
