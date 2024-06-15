<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Definir constantes para la conexión a la base de datos
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'vehiculos');

// Función para establecer la conexión a la base de datos
function conectar()
{
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

    // Verificar la conexión
    if ($conn->connect_error) {
        die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
    }

    return $conn;
}

// Verificar si se recibió una solicitud POST para eliminar una mantención
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se proporcionó un ID de mantención válido
    if (isset($data['idMantencion']) && is_numeric($data['idMantencion'])) {
        $mantencionId = $data['idMantencion'];

        // Conexión a la base de datos
        $conn = conectar();

        // Consulta para eliminar la mantención
        $sql = "DELETE FROM mantenciones WHERE idMantencion = ?";

        // Preparar la declaración SQL
        $stmt = $conn->prepare($sql);

        // Vincular parámetros
        $stmt->bind_param("i", $mantencionId);

        // Ejecutar la consulta y verificar si se eliminó correctamente
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Mantención eliminada correctamente"]);
        } else {
            echo json_encode(["success" => false, "error" => "Error al eliminar mantención: " . $stmt->error]);
        }

        // Cerrar la conexión
        $stmt->close();
        $conn->close();
        exit(); // Terminar el script después de manejar la solicitud de eliminación
    }
}

// Si la solicitud no es POST o falta el ID de mantención, simplemente devuelve un mensaje de error
echo json_encode(["success" => false, "error" => "ID de mantención no proporcionado"]);
?>
