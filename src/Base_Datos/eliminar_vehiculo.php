<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Verificar si se recibió una solicitud POST para eliminar un vehículo
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se proporcionó un ID de vehículo válido
    if (isset($data['id']) && is_numeric($data['id'])) {
        $vehiculoId = $data['id'];

        // Conexión a la base de datos
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "vehiculos";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
        }

        // Consulta para eliminar el vehículo
        $sql = "DELETE FROM vehiculo WHERE id=$vehiculoId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Vehículo eliminado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar vehículo: " . $conn->error]);
        }

        $conn->close();
        exit(); // Terminar el script después de manejar la solicitud de eliminación
    }
}

// Si la solicitud no es POST o falta el ID del vehículo, simplemente devuelve la lista de vehículos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta para obtener los vehículos
$sql = "SELECT id, marca, modelo, anio, transmision, patente FROM vehiculo";
$result = $conn->query($sql);

$vehiculos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $vehiculos[] = $row;
    }
    echo json_encode($vehiculos);
} else {
    echo json_encode([]);
}

$conn->close();
?>
<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Verificar si se recibió una solicitud POST para eliminar un vehículo
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se proporcionó un ID de vehículo válido
    if (isset($data['id']) && is_numeric($data['id'])) {
        $vehiculoId = $data['id'];

        // Conexión a la base de datos
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "vehiculos";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
        }

        // Consulta para eliminar el vehículo
        $sql = "DELETE FROM vehiculo WHERE id=$vehiculoId";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Vehículo eliminado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar vehículo: " . $conn->error]);
        }

        $conn->close();
        exit(); // Terminar el script después de manejar la solicitud de eliminación
    }
}

// Si la solicitud no es POST o falta el ID del vehículo, simplemente devuelve la lista de vehículos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta para obtener los vehículos
$sql = "SELECT id, marca, modelo, anio, transmision, patente FROM vehiculo";
$result = $conn->query($sql);

$vehiculos = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $vehiculos[] = $row;
    }
    echo json_encode($vehiculos);
} else {
    echo json_encode([]);
}

$conn->close();
?>

