<?php 
// Conexión a la base de datos y consulta para obtener las marcas
include 'conection.php'; // Aquí asumo que 'conection.php' maneja la conexión a la base de datos

$conn = conectar(); // Función conectar() debería establecer la conexión a la base de datos

$query = "SELECT * FROM marca";
$resultado = mysqli_query($conn, $query);
$marcas = array();

while ($row = mysqli_fetch_assoc($resultado)) {
    $marcas[] = $row;
}

echo json_encode($marcas);

mysqli_close($conn);
?>
