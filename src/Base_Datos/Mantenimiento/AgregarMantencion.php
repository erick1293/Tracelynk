<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'conection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$servername = DB_SERVER;
$username = DB_USERNAME;
$password = DB_PASSWORD;
$dbname = DB_NAME;
 
$conn = conectar();

// Verifica si se están recibiendo datos mediante POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Decodifica los datos JSON recibidos del cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica si se recibieron todos los campos necesarios
    if (!isset($data['idCita']) || !isset($data['idVehiculo']) || !isset($data['fecha']) || !isset($data['descripcion'])) {
        echo json_encode(array('error' => 'Todos los campos son obligatorios.'));
        exit;
    }

    // Continúa con la conexión a la base de datos y la inserción de los datos
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(array('error' => "Conexión fallida: " . $conn->connect_error));
        exit;
    }

    $idCita = $data['idCita'];
    $idVehiculo = $data['idVehiculo'];
    $fecha = $data['fecha'];
    $descripcion = $data['descripcion'];

    // Verificar si el idVehiculo existe en la tabla vehiculo
    $vehiculoCheck = $conn->prepare("SELECT id FROM vehiculo WHERE id = ?");
    $vehiculoCheck->bind_param("i", $idVehiculo);
    $vehiculoCheck->execute();
    $vehiculoCheck->store_result();

    if ($vehiculoCheck->num_rows == 0) {
        echo json_encode(array('error' => "El vehículo con ID $idVehiculo no existe."));
        $vehiculoCheck->close();
        $conn->close();
        exit;
    }

    $vehiculoCheck->close();

    // Verificar si el idCita existe en la tabla citas
    $citaCheck = $conn->prepare("SELECT id FROM citas WHERE id = ?");
    $citaCheck->bind_param("i", $idCita);
    $citaCheck->execute();
    $citaCheck->store_result();

    if ($citaCheck->num_rows == 0) {
        echo json_encode(array('error' => "La cita con ID $idCita no existe."));
        $citaCheck->close();
        $conn->close();
        exit;
    }

    $citaCheck->close();

    // Preparar la consulta para insertar la mantención en la base de datos
    $sql = "INSERT INTO mantenciones (citas_idcitas, vehiculos_id, fecha, descripcion) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiss", $idCita, $idVehiculo, $fecha, $descripcion);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(array('success' => 'Mantención agregada exitosamente.'));
    } else {
        echo json_encode(array('error' => "Error al agregar la mantención: " . $stmt->error));
    }

    // Cerrar la conexión y el statement
    $stmt->close();
    $conn->close();
} else {
    // Si no se reciben datos mediante POST, devuelve un mensaje de error
    echo json_encode(array('error' => 'No se recibieron datos mediante POST.'));
}
?>
