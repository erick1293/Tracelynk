<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Verificar si se recibió una solicitud POST para eliminar una cita
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se proporcionó un ID de cita válido
    if (isset($data['id']) && is_numeric($data['id'])) {
        $carga = $data['id'];

        // Conexión a la base de datos
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "vehiculos";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
        }

        $sql = "DELETE FROM carga WHERE nombre = '$id'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Cita eliminada correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar cita: " . $conn->error]);
        }

        $conn->close();
        exit(); // Terminar el script después de manejar la solicitud de eliminación
    }
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta para obtener las citas
$sql = "SELECT id, nombre altura , ancho, vehiculo_id FROM carga";
$result = $conn->query($sql);

$carga = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $carga[] = $row;
    }
    echo json_encode($carga);
} else {
    echo json_encode([]);
}

$conn->close();
?>