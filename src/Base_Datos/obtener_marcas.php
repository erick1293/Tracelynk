
<?php
// Conexión a la base de datos y consulta para obtener las marcas
include 'conection.php';

$query = "SELECT * FROM marca";
$resultado = mysqli_query($conn, $query);
$marcas = array();

while ($row = mysqli_fetch_assoc($resultado)) {
    $marcas[] = $row;
}

echo json_encode($marcas);

mysqli_close($conn);
?>

<?php
// Conexión a la base de datos y consulta para obtener las marcas
include 'conection.php';

$query = "SELECT * FROM marca";
$resultado = mysqli_query($conn, $query);
$marcas = array();

while ($row = mysqli_fetch_assoc($resultado)) {
    $marcas[] = $row;
}

echo json_encode($marcas);

mysqli_close($conn);
?>
