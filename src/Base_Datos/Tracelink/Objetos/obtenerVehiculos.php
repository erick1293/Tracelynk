<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$mysqli = new mysqli("localhost", "root", "", "vehiculos");

if ($mysqli->connect_errno) {
    echo json_encode(["error" => $mysqli->
    connect_error]);
    exit();
}

$query = "SELECT id, marca, modelo, anio, transmision, patente, kilometrajeinicial, kilometrajeactual FROM vehiculo";

$result = $mysqli->query($query);

$vehiculos = [];
while ($row = $result->fetch_assoc()) {
    $vehiculos[] = $row;
}

echo json_encode($vehiculos);

$mysqli->close();
?>
