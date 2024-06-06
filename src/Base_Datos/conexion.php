
<?php
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
            die("Connection failed: " . $conn->connect_error);
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
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM vehiculo";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    $conn->close();
    exit();
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>

<?php
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
            die("Connection failed: " . $conn->connect_error);
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
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM vehiculo";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
    $conn->close();
    exit();
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>

