<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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
    vehiculo v ON m.vehiculos_id = v.id
JOIN 
    mecanicos mec ON c.mecanico_id = mec.idMecanico";

$result = $conn->query($sql);

$mantenciones = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mantenciones[] = $row;
    }
}

$conn->close();

echo json_encode(array("mantenciones" => $mantenciones));
?>
