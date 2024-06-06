
<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type"); // Permitir el encabezado Content-Type
header("Content-Type: application/json");


// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtención de datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['marca']) && !empty($data['modelo']) && !empty($data['anio']) && !empty($data['transmision']) && !empty($data['patente'])) {
    $marca = $data['marca'];
    $modelo = $data['modelo'];
    $anio = $data['anio'];
    $transmision = $data['transmision'];
    $patente = $data['patente'];

    // Consulta para insertar el nuevo vehículo
    $sql = "INSERT INTO vehiculo (marca, modelo, anio, transmision, patente) VALUES ('$marca', '$modelo', '$anio', '$transmision', '$patente')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Vehículo agregado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar vehículo: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
}

$conn->close();
?>

<?php
// Habilitar la visualización de errores de PHP
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar los encabezados CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type"); // Permitir el encabezado Content-Type
header("Content-Type: application/json");


// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtención de datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data['marca']) && !empty($data['modelo']) && !empty($data['anio']) && !empty($data['transmision']) && !empty($data['patente'])) {
    $marca = $data['marca'];
    $modelo = $data['modelo'];
    $anio = $data['anio'];
    $transmision = $data['transmision'];
    $patente = $data['patente'];

    // Consulta para insertar el nuevo vehículo
    $sql = "INSERT INTO vehiculo (marca, modelo, anio, transmision, patente) VALUES ('$marca', '$modelo', '$anio', '$transmision', '$patente')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Vehículo agregado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar vehículo: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
}

$conn->close();
?>

