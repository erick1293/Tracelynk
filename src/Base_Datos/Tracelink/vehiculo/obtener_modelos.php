<?php
// Conexión a la base de datos y consulta para obtener los modelos
include 'conection.php';

$conn = conectar();

$query = "SELECT Modelo FROM modelo";
$resultado = mysqli_query($conn, $query);
$modelos = array();

while ($row = mysqli_fetch_assoc($resultado)) {
    $modelos[] = $row['Modelo'];
}

echo json_encode($modelos);

mysqli_close($conn);
?>
