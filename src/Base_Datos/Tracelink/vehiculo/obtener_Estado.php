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

$query = "SELECT * FROM estado";

$result = $mysqli->query($query);

$idEstado = [];
while ($row = $result->fetch_assoc()) {
    $idEstado[] = $row;
}

echo json_encode($idEstado);

$mysqli->close();
?>