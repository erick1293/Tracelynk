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

if (!isset($data['idMecanico']) || !isset($data['nombre']) || !isset($data['apellido']) || !isset($data['rut']) || !isset($data['especialidad'])) {
    die(json_encode(["success" => false, "error" => "Datos incompletos"]));
}

$idMecanico = $data['idMecanico'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$rut = $data['rut'];
$especialidad = $data['especialidad'];

$sql = "UPDATE mecanicos SET nombre='$nombre', apellido='$apellido', rut='$rut', especialidad='$especialidad' WHERE idMecanico='$idMecanico'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['mensaje' => 'Mecánico editado con éxito']);
} else {
    echo json_encode(['mensaje' => 'Error al editar el mecánico: ' . $conn->error]);
}

$conn->close();
?>
