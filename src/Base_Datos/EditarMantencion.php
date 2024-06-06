<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "tu_usuario", "tu_contraseña", "tu_base_de_datos");

// Verificar conexión
if ($conexion->connect_error) {
    die("La conexión falló: " . $conexion->connect_error);
}

// Recibir el ID del mantenimiento a eliminar
$id = $_POST['id'];

// Preparar la consulta SQL para eliminar
$stmt = $conexion->prepare("DELETE FROM mantenimientos WHERE id = ?");
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
