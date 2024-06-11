<?php
include 'conection.php';

// Recibir el ID del mantenimiento a eliminar
$id = $_POST['id'];

// Preparar la consulta SQL para eliminar
$stmt = $conexion->prepare("DELETE FROM mantentencion WHERE id = ?");
$stmt->bind_param("i", $id);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
