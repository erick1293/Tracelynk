-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2024 a las 20:29:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vehiculos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `idAlertas` int(11) NOT NULL,
  `mensaje` varchar(45) DEFAULT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL,
  `Estado_idEstado` int(11) NOT NULL,
  `Estado alerta_idEstado alerta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carga`
--

CREATE TABLE `carga` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `altura` float DEFAULT NULL,
  `ancho` float DEFAULT NULL,
  `vehiculo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carga`
--

INSERT INTO `carga` (`id`, `nombre`, `altura`, `ancho`, `vehiculo_id`) VALUES
(1, 'asd', 1, 1, 42),
(2, 'telefono', 12, 11, 1),
(3, 'test', 11, 12, 1),
(4, 'sfasdd', 0, 0, 39),
(5, 'pc', 15, 20, 53),
(6, '1234', 1234, 1234, 48),
(7, 'coputador', 30, 20, 7),
(8, 'telefono', 12, 14, 55),
(9, 'Telefono', 1234, 1234, 7),
(10, 'telefono', 10, 15, 58),
(11, 'celular', 10, 5, 62);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `descripcion` text NOT NULL,
  `mecanico_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `fecha`, `hora`, `descripcion`, `mecanico_id`) VALUES
(38, '2024-04-05', '13:22:00', 'llego al kilomeetraje', 136),
(39, '2024-04-22', '15:59:00', 'Cambio de bujias', 132),
(40, '2024-07-10', '02:28:00', 'kljhg', 132),
(41, '2024-07-10', '12:01:00', 'cambio de correa', 133);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas_vehiculos`
--

CREATE TABLE `citas_vehiculos` (
  `cita_id` int(11) NOT NULL,
  `vehiculo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas_vehiculos`
--

INSERT INTO `citas_vehiculos` (`cita_id`, `vehiculo_id`) VALUES
(38, 48),
(39, 3),
(40, 58),
(41, 39);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(11) NOT NULL,
  `estado` text DEFAULT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `estado`, `fecha`) VALUES
(1, 'Encendido', '2024-06-11'),
(2, 'Apagado', '2024-06-05'),
(3, 'Mantencion', '2024-06-03'),
(7, 'Detenido', '4322-03-12'),
(8, 'Estacionado', '0004-03-12'),
(10, 'en la u', '0443-03-12'),
(11, 'jugando', '4233-02-12'),
(12, 'en prueba', '2024-07-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado alerta`
--

CREATE TABLE `estado alerta` (
  `idEstado alerta` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_has_vehiculo`
--

CREATE TABLE `estado_has_vehiculo` (
  `Estado_idEstado` int(11) NOT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial de alertas`
--

CREATE TABLE `historial de alertas` (
  `idHistorial de alertas` int(11) NOT NULL,
  `Historial de alertascol1` varchar(45) DEFAULT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial de alertas_has_alertas`
--

CREATE TABLE `historial de alertas_has_alertas` (
  `Historial de alertas_idHistorial de alertas` int(11) NOT NULL,
  `Historial de alertas_Vehiculo_idVehiculo` int(11) NOT NULL,
  `Alertas_idAlertas` int(11) NOT NULL,
  `Alertas_Vehiculo_idVehiculo` int(11) NOT NULL,
  `Alertas_Estado_idEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenciones`
--

CREATE TABLE `mantenciones` (
  `idMantencion` int(11) NOT NULL,
  `citas_idcitas` int(11) DEFAULT NULL,
  `vehiculos_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mantenciones`
--

INSERT INTO `mantenciones` (`idMantencion`, `citas_idcitas`, `vehiculos_id`, `fecha`, `descripcion`) VALUES
(124, 123, 7, '2024-07-04', 'holaa'),
(163, 36, 3, '2521-11-12', '1234'),
(164, 38, 54, '2024-07-10', 'se cambio la correa y el aceite'),
(165, 36, 53, '2024-07-11', 'ola'),
(166, 41, 39, '2024-07-11', '124');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `idMarca` int(11) NOT NULL,
  `Nombre_marca` varchar(45) NOT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL,
  `Vehiculo_citas_idcitas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`idMarca`, `Nombre_marca`, `Vehiculo_idVehiculo`, `Vehiculo_citas_idcitas`) VALUES
(0, 'Chevrolet', 0, 0),
(1, 'Suzuky', 0, 0),
(2, 'Toyota', 0, 0),
(3, 'Mazda', 0, 0),
(4, 'Ford', 0, 0),
(5, 'Geely', 0, 0),
(6, 'Honda', 0, 0),
(7, 'Volkswagen', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mecanicos`
--

CREATE TABLE `mecanicos` (
  `idMecanico` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `apellido` text NOT NULL,
  `rut` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mecanicos`
--

INSERT INTO `mecanicos` (`idMecanico`, `nombre`, `especialidad`, `apellido`, `rut`) VALUES
(132, 'Taller mecanico chino scuty', 'Mecanico encargado de cambiar aceite', 'Amplacion pratt', '20.036.437-6'),
(133, 'Taller mecanico mañunga', 'Mecanico encargado de cambiar bujias', 'av meneses', '20.409.751-8'),
(134, 'taller mecanico los venekos', 'cambio de correas', 'av piñera', '5.126.663-3'),
(135, 'taller vico ', 'empresavico', 'yumbel', '20.151.925-k'),
(136, 'taller de la profe', 'hola', 'yumbel ', '15.870.613-k');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `idModelo` int(11) NOT NULL,
  `Modelo` varchar(45) NOT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL,
  `Vehiculo_citas_idcitas` int(11) NOT NULL,
  `idMarca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`idModelo`, `Modelo`, `Vehiculo_idVehiculo`, `Vehiculo_citas_idcitas`, `idMarca`) VALUES
(11, 'Camaro', 0, 0, 0),
(23, 'Spark', 0, 0, 0),
(24, 'Malibu', 0, 0, 0),
(24, 'Traverse', 0, 0, 0),
(25, 'Equinox', 0, 0, 0),
(0, 'Vitara', 0, 0, 1),
(17, 'Swift', 0, 0, 1),
(18, 'SX4 S-Cross', 0, 0, 1),
(20, 'Baleno', 0, 0, 1),
(21, 'Celerio', 0, 0, 1),
(22, 'Jimny', 0, 0, 1),
(9, 'Yaris', 0, 0, 2),
(10, 'Hilux', 0, 0, 2),
(7, 'Mazda2', 0, 0, 3),
(8, 'Mazda3', 0, 0, 3),
(12, 'Ranger', 0, 0, 4),
(13, 'Mustang ', 0, 0, 4),
(14, 'Focus', 0, 0, 4),
(15, 'F-150', 0, 0, 4),
(18, 'GX3', 0, 0, 5),
(19, 'Azkara Luxury ', 0, 0, 5),
(1, 'Civic ', 0, 0, 6),
(2, 'CR-V', 0, 0, 6),
(3, 'Hr-v SuV', 0, 0, 6),
(17, 'Pilot', 0, 0, 6),
(4, 'Nuevo Golf', 0, 0, 7),
(5, 'T-Roc', 0, 0, 7),
(6, 'Polo', 0, 0, 7),
(16, 'Taigo', 0, 0, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `poligono`
--

CREATE TABLE `poligono` (
  `idPoligono` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `poligono`
--

INSERT INTO `poligono` (`idPoligono`, `nombre`) VALUES
(1, 'Copiapo'),
(2, 'Tierra_Amarilla'),
(3, 'Paipote'),
(4, 'vallenar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos`
--

CREATE TABLE `puntos` (
  `idPuntos` int(11) NOT NULL,
  `Longitud` text DEFAULT NULL,
  `Latitud` text DEFAULT NULL,
  `Poligono_idPoligono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `puntos`
--

INSERT INTO `puntos` (`idPuntos`, `Longitud`, `Latitud`, `Poligono_idPoligono`) VALUES
(1, '-70.3086136488491', '-27.33360547581458', 1),
(2, '-70.36877898892281', '-27.351702581932837', 1),
(3, '-70.3461700066091', '-27.380347504022765', 1),
(4, '-70.29230581781657', '-27.42293152950013', 1),
(5, '-70.26569830453009', '-27.392833963748277', 1),
(8, '-70.266866', '-27.459477', 2),
(9, '-70.256863', '-27.467039', 2),
(10, '-70.264935', '-27.488997', 2),
(11, '-70.269771', '-27.467226', 2),
(12, '-70.274319', '-27.418859', 3),
(13, '-70.265769', '-27.404308', 3),
(14, '-70.267954', '-27.403066', 3),
(15, '-70.291571', '-27.410601', 3),
(16, '-70.783637', '-28.548419', 4),
(17, '-70.729049', '-28.553848', 4),
(18, '-70.741323', '-28.603971', 4),
(19, '-70.849894', '-28.616386 ', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestos`
--

CREATE TABLE `respuestos` (
  `idRespuesto` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `Categoria_idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestos_has_vehiculo`
--

CREATE TABLE `respuestos_has_vehiculo` (
  `Respuestos_idRespuesto` int(11) NOT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL,
  `Vehiculo_Poligono_idPoligono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Administrador'),
(2, 'Usuario'),
(3, 'secretario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `idSensor` int(11) NOT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL,
  `Vehiculo_Poligono_idPoligono` int(11) NOT NULL,
  `Tipo sensor_idTipo sensor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo sensor`
--

CREATE TABLE `tipo sensor` (
  `idTipo sensor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transmision`
--

CREATE TABLE `transmision` (
  `idTransmision` int(11) NOT NULL,
  `Transmision` varchar(45) DEFAULT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL,
  `Vehiculo_citas_idcitas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `idUbicacion` int(11) NOT NULL,
  `latitud` varchar(45) DEFAULT NULL,
  `longitud` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `Vehiculo_idVehiculo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`idUbicacion`, `latitud`, `longitud`, `fecha`, `Vehiculo_idVehiculo`) VALUES
(1, '-27.360536', '-70.335042', NULL, 0),
(2, '-27.361144', '-70.335578', NULL, 0),
(3, '-27.361163', '-70.337359', NULL, 0),
(4, '-27.361140', '-70.338172', NULL, 0),
(5, '-27.360910', '-70.340217', NULL, 0),
(6, '-27.361168', '-70.340449', NULL, 0),
(7, '-27.361485', '-70.340764', NULL, 0),
(8, '-27.361719', '-70.340992', NULL, 0),
(9, '-27.362006', '-70.341280', NULL, 0),
(10, '-27.362437', '-70.341677', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role_id`) VALUES
(8, 'admi', '123', 1),
(10, 'admin', '123', 1),
(12, 'administrador 2', '123', 1),
(16, 'Seba', '123', 2),
(20, 'erick', '123', 2),
(22, 'asd', '123', 2),
(24, 'hola', '123', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor sensor`
--

CREATE TABLE `valor sensor` (
  `idValor sensor` int(11) NOT NULL,
  `Sensor_idSensor` int(11) NOT NULL,
  `Sensor_Vehiculo_idVehiculo` int(11) NOT NULL,
  `Sensor_Vehiculo_Poligono_idPoligono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `marca` text NOT NULL,
  `modelo` text NOT NULL,
  `anio` int(7) NOT NULL,
  `transmision` text NOT NULL,
  `patente` text NOT NULL,
  `id` int(255) NOT NULL,
  `kilometrajeinicial` int(11) NOT NULL,
  `kilometrajeactual` int(11) NOT NULL,
  `idEstado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`marca`, `modelo`, `anio`, `transmision`, `patente`, `id`, `kilometrajeinicial`, `kilometrajeactual`, `idEstado`) VALUES
('Ford', 'F-150', 2023, 'Automatico', 'xd1ga', 1, 22, 22, 10),
('Mazda', 'CR-V', 3234, 'Automatico', '412gadd', 3, 33, 33, 3),
('Volkswagen', 'CR-V', 20309, 'Automático', '3', 7, 2, 2, 2),
('Honda', 'Vitara', 123444, 'Manual', 'afas11', 37, 12343, 123451, 1),
('Susuky', 'Vitara', 12, 'Manual', '14fsaa', 38, 1234, 12345, 2),
('Susuky', 'CR-V', 1234, 'Automático', '1234', 39, 123, 12, 2),
('Ford', 'Nuevo Golf', 123411, 'Automatico', '12', 42, 12341, 1234, 1),
('Toyota', 'Vitara', 2020, 'Manual', '1234111532aadd', 48, 12345, 12, 2),
('Susuky', 'Civic ', 123413, 'Automatico', '134tfgasas', 53, 124, 12345, 2),
('Honda', 'Civic ', 2134, 'Manual', '11234', 54, 1234, 1234, 2),
('Susuky', 'Vitara', 123, 'Automatico', '1234safa', 55, 1234, 1234, 10),
('Susuky', 'Vitara', 2020, 'Automatico', '13yuki', 56, 2, 12, 11),
('Mazda', 'Ranger', 2024, 'Automatico', '1HF1GASD1', 57, 20203, 204503, NULL),
('Honda', 'Civic ', 2024, 'Manual', 'hassd124', 58, 11, 12234, 2),
('Suzuky', 'Vitara', 1234, 'Automatico', '3421', 61, 341, 342, NULL),
('Volkswagen', 'Swift', 2134, 'Automatico', '1234gdfa2', 62, 4331, 41232, 11),
('Geely', 'GX3', 2012, 'Automatico', 'hj24pg', 63, 123, 1234, 12);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`idAlertas`,`Vehiculo_idVehiculo`,`Estado_idEstado`),
  ADD KEY `fk_Alertas_Vehiculo` (`Vehiculo_idVehiculo`),
  ADD KEY `fk_Alertas_Estado1` (`Estado_idEstado`),
  ADD KEY `fk_Alertas_Estado alerta1` (`Estado alerta_idEstado alerta`);

--
-- Indices de la tabla `carga`
--
ALTER TABLE `carga`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehiculo_id` (`vehiculo_id`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mecanico` (`mecanico_id`);

--
-- Indices de la tabla `citas_vehiculos`
--
ALTER TABLE `citas_vehiculos`
  ADD PRIMARY KEY (`cita_id`,`vehiculo_id`),
  ADD KEY `vehiculo_id` (`vehiculo_id`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `estado alerta`
--
ALTER TABLE `estado alerta`
  ADD PRIMARY KEY (`idEstado alerta`);

--
-- Indices de la tabla `estado_has_vehiculo`
--
ALTER TABLE `estado_has_vehiculo`
  ADD PRIMARY KEY (`Estado_idEstado`,`Vehiculo_idVehiculo`),
  ADD KEY `fk_Estado_has_Vehiculo_Vehiculo1` (`Vehiculo_idVehiculo`);

--
-- Indices de la tabla `historial de alertas`
--
ALTER TABLE `historial de alertas`
  ADD PRIMARY KEY (`idHistorial de alertas`,`Vehiculo_idVehiculo`),
  ADD KEY `fk_Historial de alertas_Vehiculo1` (`Vehiculo_idVehiculo`);

--
-- Indices de la tabla `historial de alertas_has_alertas`
--
ALTER TABLE `historial de alertas_has_alertas`
  ADD PRIMARY KEY (`Historial de alertas_idHistorial de alertas`,`Historial de alertas_Vehiculo_idVehiculo`,`Alertas_idAlertas`,`Alertas_Vehiculo_idVehiculo`,`Alertas_Estado_idEstado`),
  ADD KEY `fk_Historial de alertas_has_Alertas_Alertas1` (`Alertas_idAlertas`,`Alertas_Vehiculo_idVehiculo`,`Alertas_Estado_idEstado`);

--
-- Indices de la tabla `mantenciones`
--
ALTER TABLE `mantenciones`
  ADD PRIMARY KEY (`idMantencion`),
  ADD KEY `vehiculos_id` (`vehiculos_id`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`idMarca`,`Nombre_marca`),
  ADD KEY `fk_Marca_Vehiculo1` (`Vehiculo_idVehiculo`,`Vehiculo_citas_idcitas`);

--
-- Indices de la tabla `mecanicos`
--
ALTER TABLE `mecanicos`
  ADD PRIMARY KEY (`idMecanico`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`idModelo`,`Modelo`,`Vehiculo_idVehiculo`,`Vehiculo_citas_idcitas`),
  ADD KEY `fk_Modelo_Vehiculo1` (`Vehiculo_idVehiculo`,`Vehiculo_citas_idcitas`),
  ADD KEY `fk_modelo_marca` (`idMarca`);

--
-- Indices de la tabla `poligono`
--
ALTER TABLE `poligono`
  ADD PRIMARY KEY (`idPoligono`);

--
-- Indices de la tabla `puntos`
--
ALTER TABLE `puntos`
  ADD PRIMARY KEY (`idPuntos`,`Poligono_idPoligono`),
  ADD KEY `fk_Puntos_Poligono1` (`Poligono_idPoligono`);

--
-- Indices de la tabla `respuestos`
--
ALTER TABLE `respuestos`
  ADD PRIMARY KEY (`idRespuesto`,`Categoria_idCategoria`),
  ADD KEY `fk_Respuestos_Categoria1` (`Categoria_idCategoria`);

--
-- Indices de la tabla `respuestos_has_vehiculo`
--
ALTER TABLE `respuestos_has_vehiculo`
  ADD PRIMARY KEY (`Respuestos_idRespuesto`,`Vehiculo_idVehiculo`,`Vehiculo_Poligono_idPoligono`),
  ADD KEY `fk_Respuestos_has_Vehiculo_Vehiculo1` (`Vehiculo_idVehiculo`,`Vehiculo_Poligono_idPoligono`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`idSensor`,`Vehiculo_idVehiculo`,`Vehiculo_Poligono_idPoligono`,`Tipo sensor_idTipo sensor`),
  ADD KEY `fk_Sensor_Vehiculo1` (`Vehiculo_idVehiculo`,`Vehiculo_Poligono_idPoligono`),
  ADD KEY `fk_Sensor_Tipo sensor1` (`Tipo sensor_idTipo sensor`);

--
-- Indices de la tabla `tipo sensor`
--
ALTER TABLE `tipo sensor`
  ADD PRIMARY KEY (`idTipo sensor`);

--
-- Indices de la tabla `transmision`
--
ALTER TABLE `transmision`
  ADD PRIMARY KEY (`idTransmision`),
  ADD KEY `fk_Transmision_Vehiculo1` (`Vehiculo_idVehiculo`,`Vehiculo_citas_idcitas`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`idUbicacion`,`Vehiculo_idVehiculo`),
  ADD KEY `fk_Ubicacion_Vehiculo1` (`Vehiculo_idVehiculo`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_id` (`role_id`);

--
-- Indices de la tabla `valor sensor`
--
ALTER TABLE `valor sensor`
  ADD PRIMARY KEY (`idValor sensor`,`Sensor_idSensor`,`Sensor_Vehiculo_idVehiculo`,`Sensor_Vehiculo_Poligono_idPoligono`),
  ADD KEY `fk_Valor sensor_Sensor1` (`Sensor_idSensor`,`Sensor_Vehiculo_idVehiculo`,`Sensor_Vehiculo_Poligono_idPoligono`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `patente` (`patente`) USING HASH,
  ADD KEY `fk_estado` (`idEstado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alertas`
--
ALTER TABLE `alertas`
  MODIFY `idAlertas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carga`
--
ALTER TABLE `carga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `estado alerta`
--
ALTER TABLE `estado alerta`
  MODIFY `idEstado alerta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial de alertas`
--
ALTER TABLE `historial de alertas`
  MODIFY `idHistorial de alertas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mantenciones`
--
ALTER TABLE `mantenciones`
  MODIFY `idMantencion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT de la tabla `mecanicos`
--
ALTER TABLE `mecanicos`
  MODIFY `idMecanico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT de la tabla `poligono`
--
ALTER TABLE `poligono`
  MODIFY `idPoligono` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `puntos`
--
ALTER TABLE `puntos`
  MODIFY `idPuntos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `respuestos`
--
ALTER TABLE `respuestos`
  MODIFY `idRespuesto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `idSensor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo sensor`
--
ALTER TABLE `tipo sensor`
  MODIFY `idTipo sensor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `idUbicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `valor sensor`
--
ALTER TABLE `valor sensor`
  MODIFY `idValor sensor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carga`
--
ALTER TABLE `carga`
  ADD CONSTRAINT `carga_ibfk_1` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_mecanico` FOREIGN KEY (`mecanico_id`) REFERENCES `mecanicos` (`idMecanico`);

--
-- Filtros para la tabla `citas_vehiculos`
--
ALTER TABLE `citas_vehiculos`
  ADD CONSTRAINT `citas_vehiculos_ibfk_1` FOREIGN KEY (`cita_id`) REFERENCES `citas` (`id`),
  ADD CONSTRAINT `citas_vehiculos_ibfk_2` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `mantenciones`
--
ALTER TABLE `mantenciones`
  ADD CONSTRAINT `mantenciones_ibfk_1` FOREIGN KEY (`vehiculos_id`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD CONSTRAINT `fk_modelo_marca` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`idMarca`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `fk_estado` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
