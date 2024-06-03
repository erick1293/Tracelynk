<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "tu_usuario", "tu_contraseña", "tu_base_de_datos");

// Verificar conexión
if ($conexion->connect_error) {
    die("La conexión falló: " . $conexion->connect_error);
}

// Recibir los datos del formulario
$cita_id = $_POST['cita_id'];
$descripcion = $_POST['descripcion'];

// Preparar la consulta SQL para insertar
$stmt = $conexion->prepare("INSERT INTO mantenimientos (cita_id, descripcion) VALUES (?, ?)");
$stmt->bind_param("is", $cita_id, $descripcion);

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
