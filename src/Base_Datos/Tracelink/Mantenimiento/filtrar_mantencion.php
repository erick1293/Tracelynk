<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

// Intenta conectar con la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtén los parámetros GET
$from_date = $_GET['from_date'] ?? '';
$to_date = $_GET['to_date'] ?? '';
$mechanic_name = $_GET['mechanic_name'] ?? '';

// Prepara la consulta SQL
$sql = "SELECT 
            m.idMantencion, 
            m.fecha, 
            m.descripcion, 
            c.id AS cita_id, 
            c.hora, 
            c.fecha AS cita_fecha, 
            v.id AS vehiculo_id, 
            v.marca, 
            v.modelo, 
            v.anio, 
            v.transmision, 
            v.patente, 
            v.kilometrajeinicial, 
            v.kilometrajeactual,
            mec.idMecanico AS mecanico_id,
            mec.nombre AS mecanico_nombre,
            mec.apellido AS mecanico_apellido,
            mec.especialidad AS mecanico_especialidad,
            mec.rut AS mecanico_rut
        FROM 
            mantenciones m 
        JOIN 
            citas c ON m.citas_idcitas = c.id 
        JOIN 
            citas_vehiculos cv ON c.id = cv.cita_id
        JOIN 
            vehiculo v ON cv.vehiculo_id = v.id
        JOIN 
            mecanicos mec ON c.mecanico_id = mec.idMecanico
        WHERE 
            m.fecha BETWEEN ? AND ?
            AND (mec.nombre LIKE CONCAT('%', ?, '%') OR mec.apellido LIKE CONCAT('%', ?, '%'))";

// Prepara la consulta
$stmt = $conn->prepare($sql);

// Verifica la preparación de la consulta
if ($stmt === false) {
    die('Error preparing statement: ' . $conn->error);
}

// Enlaza los parámetros y ejecuta la consulta
$stmt->bind_param("ssss", $from_date, $to_date, $mechanic_name, $mechanic_name);
$stmt->execute();

// Obtiene el resultado de la consulta
$result = $stmt->get_result();

// Verifica si hay resultados
if ($result === false) {
    die('Error executing statement: ' . $stmt->error);
}

// Procesa los resultados
$mantenciones = array();
while ($row = $result->fetch_assoc()) {
    $mantenciones[] = $row;
}

// Cierra la consulta y la conexión
$stmt->close();
$conn->close();

// Retorna los resultados como JSON
echo json_encode($mantenciones);
?>
