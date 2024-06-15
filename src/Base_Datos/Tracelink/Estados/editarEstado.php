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

if (!isset($data['idEstado']) || !isset($data['estado']) || !isset($data['fecha'])) {
    die(json_encode(["success" => false, "error" => "Datos incompletos"]));
}

$idEstado = $data['idEstado'];
$estado = $data['estado'];
$fecha = $data['fecha'];

$sql = "UPDATE estado SET estado='$estado', fecha='$fecha' WHERE idEstado='$idEstado'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['mensaje' => 'Estado editado con éxito']);
} else {
    echo json_encode(['mensaje' => 'Error al editar el estado: ' . $conn->error]);
}

$conn->close();
?>
