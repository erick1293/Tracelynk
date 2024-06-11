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
        $citaId = $data['id'];

        // Conexión a la base de datos
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "vehiculos";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
        }

        // Consulta para eliminar la cita
        $sql = "DELETE FROM citas WHERE id=$citaId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Cita eliminada correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar cita: " . $conn->error]);
        }

        $conn->close();
        exit(); // Terminar el script después de manejar la solicitud de eliminación
    }
}

// Si la solicitud no es POST o falta el ID de la cita, simplemente devuelve la lista de citas
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta para obtener las citas
$sql = "SELECT id, nombre_mecanico, fecha, hora, descripcion FROM citas";
$result = $conn->query($sql);

$citas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $citas[] = $row;
    }
    echo json_encode($citas);
} else {
    echo json_encode([]);
}

$conn->close();
?>
