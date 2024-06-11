<?php
// Habilitar la visualización de errores de PHP
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

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
print_r($data); 


    // Verificar que los datos necesarios están presentes
    if (!isset ($data['idMantencion']) && !empty($data['citas_idcitas']) && !empty($data['fecha']) && !empty($data['descripcion'])) {
        die(json_encode(["success" => false, "error" => "Datos incompletos"]));
    }
        $idMantencion = $data['idMantencion'];
        $citas_idcitas = $data['citas_idcitas'];
        $fecha = $data['fecha'];
        $descripcion = $data['descripcion'];

        // Preparar la consulta SQL para insertar datos en la tabla mantencion
       $sql = "INSERT INTO mantencion (idMantencion, citas_idcitas, fecha, descripcion) VALUES ('$idMantencion' , '$citas_idcitas', '$fecha', '$descripcion')";
        
// Ejecutar la consulta SQL y manejar errores
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Cita agregada exitosamente"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $conn->error]);
}
       

// Cerrar la conexión
$conn->close();
?>