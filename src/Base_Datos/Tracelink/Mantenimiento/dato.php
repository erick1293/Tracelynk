<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "vehiculos");

if ($mysqli->connect_errno) {
    echo json_encode(["error" => $mysqli->connect_error]);
    exit();
}

$query = "SELECT m.idMantencion, m.fecha, m.descripcion, c.id AS cita_id, c.nombre_mecanico, c.hora, c.fecha AS cita_fecha, v.id AS vehiculo_id, v.marca, v.modelo, v.anio, v.transmision, v.patente, v.kilometrajeinicial, v.kilometrajeactual  FROM mantenciones m JOIN citas c ON m.citas_idcitas = c.id JOIN vehiculo v ON m.vehiculos_id = v.id";

$result = $mysqli->query($query);

$mantenciones = [];
while ($row = $result->fetch_assoc()) {
    $mantenciones[] = $row;
}

echo json_encode(["mantenciones" => $mantenciones]);

$mysqli->close();
?>
