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

// Consulta a la base de datos
$sql = "SELECT idMecanico, nombre, apellido, rut, especialidad FROM mecanicos";
$result = $conn->query($sql);

$mecanicos = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mecanicos[] = $row;
    }
    echo json_encode($mecanicos);
} else {
    echo json_encode([]);
}

$conn->close();
?>
