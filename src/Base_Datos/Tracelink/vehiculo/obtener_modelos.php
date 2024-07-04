<?php
// Conexión a la base de datos y consulta para obtener los modelos según la marca seleccionada
include 'conection.php';

// Obtener el parámetro 'marca' enviado por GET
$marcaNombre = $_GET['marca'] ?? null;

// Verificar que se recibió un valor válido para 'marca'
if (!$marcaNombre) {
    die('Parámetro de marca inválido.');
}

$conn = conectar(); // Suponiendo que esta función establece la conexión a la base de datos

// Consulta para obtener los modelos asociados a la marca seleccionada
$query = "SELECT m.Modelo 
          FROM modelo m 
          INNER JOIN marca ma ON m.idMarca = ma.idMarca 
          WHERE ma.Nombre_marca = '$marcaNombre'";

$resultado = mysqli_query($conn, $query);
$modelos = array();

while ($row = mysqli_fetch_assoc($resultado)) {
    $modelos[] = $row['Modelo'];
}

echo json_encode($modelos);

mysqli_close($conn);
?>
