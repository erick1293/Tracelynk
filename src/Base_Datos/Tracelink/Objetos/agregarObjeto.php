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
$data = json_decode(file_get_contents('php://input'), true);
print_r($data); // Verificar los datos recibidos

if (!isset($data['nombre']) || !isset($data['altura']) || !isset($data['ancho'])|| !isset($data['vehiculo_id'])) {
    die(json_encode(["success" => false, "error" => "Datos incompletos"]));
}

$nombre = $data['nombre'];
$altura = $data['altura'];
$ancho = $data['ancho'];
$vehiculo_id = $data['vehiculo_id'];

$sql = "INSERT INTO Carga (nombre, altura, ancho, vehiculo_id) VALUES ('$nombre', '$altura', '$ancho', '$vehiculo_id')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(['mensaje' => 'Objeto agregado con éxito']);
} else {
  echo json_encode(['mensaje' => 'Error al agregar el objeto: ' . $conn->error]);
}

$conn->close();
?>
