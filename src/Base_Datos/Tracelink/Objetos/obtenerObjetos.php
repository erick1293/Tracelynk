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

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}


$sql = " SELECT nombre, altura, ancho , id , vehiculo_id FROM carga ";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    $carga = [];
    while($row = $result->fetch_assoc()) {
        $carga[] = $row;
    }
    echo json_encode($carga);
} else {
    echo json_encode(["message" => "No se encontraron datos"]);
}

// Cerrar la conexión
$conn->close();
?>