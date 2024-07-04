<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include 'conexion.php'; // Asegúrate de que este archivo tenga la configuración correcta para conectarse a tu base de datos

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados en el cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar que todos los campos necesarios estén presentes
    if (isset($data['cita_id'], $data['vehiculo_id'])) {
        $cita_id = $data['cita_id'];
        $vehiculo_id = $data['vehiculo_id'];

        // Preparar la consulta SQL
        $sql = "INSERT INTO citas_vehiculos (cita_id, vehiculo_id) VALUES (?, ?)";

        // Preparar la declaración
        if ($stmt = $conn->prepare($sql)) {
            // Vincular los parámetros
            $stmt->bind_param("ii", $cita_id, $vehiculo_id);

            // Ejecutar la declaración
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Relación cita-vehículo agregada correctamente']);
            } else {
                echo json_encode(['error' => 'Error al ejecutar la consulta']);
            }

            // Cerrar la declaración
            $stmt->close();
        } else {
            echo json_encode(['error' => 'Error al preparar la consulta']);
        }
    } else {
        echo json_encode(['error' => 'Datos incompletos']);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
