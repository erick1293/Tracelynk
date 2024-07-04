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

// Leer datos del cuerpo de la petición
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si todos los campos están presentes
if (!isset($data['nombre']) || !isset($data['apellido']) || !isset($data['rut']) || !isset($data['especialidad'])) {
    die(json_encode(["success" => false, "error" => "Datos incompletos"]));
}

// Función para validar RUT (básica)
function validarRut($rut) {
    // Formato básico: XX.XXX.XXX-Y
    $rut = preg_replace('/[^0-9kK]/', '', $rut); // Limpiar el RUT

    if (strlen($rut) < 2) {
        return false;
    }

    $digito_verificador = strtoupper(substr($rut, -1));
    $rut = substr($rut, 0, -1);

    $factor = 2;
    $suma = 0;

    for ($i = strlen($rut) - 1; $i >= 0; $i--) {
        $suma += $rut[$i] * $factor;
        $factor = $factor == 7 ? 2 : $factor + 1;
    }

    $digito_calculado = 11 - $suma % 11;
    $digito_calculado = $digito_calculado == 11 ? 0 : ($digito_calculado == 10 ? 'K' : $digito_calculado);

    return $digito_calculado == $digito_verificador;
}

// Validar RUT antes de insertar en la base de datos
$rut = $data['rut'];
if (!validarRut($rut)) {
    die(json_encode(["success" => false, "error" => "RUT inválido"]));
}

// Escapar y asignar valores
$nombre = $conn->real_escape_string($data['nombre']);
$apellido = $conn->real_escape_string($data['apellido']);
$rut = $conn->real_escape_string($rut);
$especialidad = $conn->real_escape_string($data['especialidad']);

// Consulta SQL para insertar el mecánico
$sql = "INSERT INTO mecanicos (nombre, apellido, rut, especialidad) VALUES ('$nombre', '$apellido', '$rut', '$especialidad')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'mensaje' => 'Mecánico agregado con éxito', 'idMecanico' => $conn->insert_id]);
} else {
    echo json_encode(['success' => false, 'mensaje' => 'Error al agregar el mecánico: ' . $conn->error]);
}

$conn->close();
?>
