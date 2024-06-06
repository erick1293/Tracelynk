
<?php
// Conexión a la base de datos y consulta para obtener los modelos
include 'conection.php';

$conn = conectar();

// Verificar si se estableció la conexión
if (!$conn) {
    echo json_encode(["error" => "La conexión a la base de datos falló"]);
    exit();
}

// Consulta para obtener los modelos
$query = "SELECT * FROM modelo";
$resultado = mysqli_query($conn, $query);

// Verificar si la consulta fue exitosa
if (!$resultado) {
    echo json_encode(["error" => "Error en la consulta: " . mysqli_error($conn)]);
    exit();
}

// Crear un array para almacenar los modelos
$modelos = [];

// Iterar sobre los resultados y agregar los modelos al array
while ($row = mysqli_fetch_assoc($resultado)) {
    $modelos[] = $row;
}

// Devolver los modelos como JSON
echo json_encode($modelos);

// Cerrar la conexión a la base de datos
$conn->close();
?>

<?php
// Conexión a la base de datos y consulta para obtener los modelos
include 'conection.php';

$conn = conectar();

// Verificar si se estableció la conexión
if (!$conn) {
    echo json_encode(["error" => "La conexión a la base de datos falló"]);
    exit();
}

// Consulta para obtener los modelos
$query = "SELECT * FROM modelo";
$resultado = mysqli_query($conn, $query);

// Verificar si la consulta fue exitosa
if (!$resultado) {
    echo json_encode(["error" => "Error en la consulta: " . mysqli_error($conn)]);
    exit();
}

// Crear un array para almacenar los modelos
$modelos = [];

// Iterar sobre los resultados y agregar los modelos al array
while ($row = mysqli_fetch_assoc($resultado)) {
    $modelos[] = $row;
}

// Devolver los modelos como JSON
echo json_encode($modelos);

// Cerrar la conexión a la base de datos
$conn->close();
?>

