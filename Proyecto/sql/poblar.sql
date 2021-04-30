DROP DATABASE IF EXISTS `NATGAS_MEMEH`;
CREATE DATABASE `NATGAS_MEMEH`; 
USE `NATGAS_MEMEH`;

-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2021 at 07:05 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `natgas_memeh`
--

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `idEmpleado` int(11) NOT NULL,
  `usuario` varchar(14) DEFAULT NULL,
  `nombreEmpleado` varchar(64) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `rol` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`idEmpleado`, `usuario`, `nombreEmpleado`, `contrasena`, `rol`) VALUES
(1, 'admin', 'admin', '$2a$12$3PTLrE4XWH2A58lTpnQmeOOD7n87BR8bfPC27ead74qxB2wWvHmu2', 1),
(2, 'admin-2', 'Administrador 2', '$2a$12$Vx72ALY06Vpr/VGfi3gQAu62nOdc3CIh/glqVaQquTF6d/bqBeTOu', 1);

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(11) NOT NULL,
  `Estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estado`
--

INSERT INTO `estado` (`idEstado`, `Estado`) VALUES
(1, 'Pendiente'),
(2, 'En progreso'),
(3, 'Terminado');

-- --------------------------------------------------------

--
-- Table structure for table `fase`
--

CREATE TABLE `fase` (
  `idFase` int(11) NOT NULL,
  `nombreFase` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fase`
--

INSERT INTO `fase` (`idFase`, `nombreFase`) VALUES
(1, 'Análisis'),
(2, 'Diseño'),
(3, 'Implementación'),
(4, 'Pruebas');

-- --------------------------------------------------------

--
-- Table structure for table `historiausuario`
--

CREATE TABLE `historiausuario` (
  `idHistoria` int(11) NOT NULL,
  `yo_como` varchar(64) DEFAULT NULL,
  `quiero` varchar(255) DEFAULT NULL,
  `para` varchar(255) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `AP` int(11) NOT NULL,
  `idProyecto` int(11) DEFAULT NULL,
  `iteracion` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `historiausuario`
--

INSERT INTO `historiausuario` (`idHistoria`, `yo_como`, `quiero`, `para`, `comentario`, `AP`, `idProyecto`, `iteracion`) VALUES
(2, 'comercial', 'consultar preaprobación con el método FICO', 'saber si continuar o no con una solicitud', 'Esto cambia la antigua lógica de preaprobación.', 13, 1, NULL),
(3, 'comercial', 'crear solicitudes de kit de conversión en Impúlsate desde Orígenes', 'sentir que los sistemas están conectados y agilizar el proceso', 'Esto es agregar una Query en Impúlsate para consultar si una solicitud fue aprobada.', 5, 1, NULL),
(4, 'mesa de prospectos', 'ver las solicitudes que requieren agendar visita de preaprobación', 'agendar visita de preaprobación', 'No comments yet.', 3, 1, NULL),
(5, 'mesa de prospectos', 'ver las solicitudes que ya tienen cita', 'que dependiendo del resultado de la visita pueda preaprobar o no las solicitudes', 'No comments yet.', 3, 1, NULL),
(6, 'mesa de prospectos', 'registrar que se agendó la visita de una solicitud', 'que el comercial vea que se está dando seguimiento', 'No comments yet.', 3, 1, NULL),
(7, 'mesa de prospectos', 'registrar resultado de preaprobación de una solicitud', 'que se continue con el proceso', 'No comments yet.', 3, 1, NULL),
(8, 'mesa de prospectos', 'quitar status de preaprobación', 'si la cagué al registrarlo', 'solo para solicitudes con semáforo naranja', 3, 1, NULL),
(9, 'comercial', 'que al consultar la preaprobación, la dirección se consulte con ayuda del api de google de direcciones', 'equivocarme menos', 'Guardar coordenadas', 5, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `proyecto`
--

CREATE TABLE `proyecto` (
  `idProyecto` int(11) NOT NULL,
  `nombreProyecto` varchar(64) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fechaPlaneada` date DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `proyecto`
--

INSERT INTO `proyecto` (`idProyecto`, `nombreProyecto`, `descripcion`, `fechaPlaneada`, `fechaEntrega`) VALUES
(1, 'Negocios. (EDITADO)', 'Negociación con vehículos para transición a motores con funcionamiento a gas. (EDITADO)', '2021-04-28', '2021-04-30'),
(2, 'Más y mejores ventas', 'Este proyecto podrá ser capaz de establecer una estrategia de ventas buena', '2021-04-29', '2021-04-30'),
(3, 'Alcance con más clientes', 'En este proyecto podremos alcanzar más clientes mediante publicidad en redes sociales y en físico con patrocinadores', '2021-04-29', '2021-04-30'),
(4, 'Llegar a más empresas', 'Con este proyecto podremos planear una estrategia para vender más GNV a los vehículos de otras empresas', '2021-04-29', '2021-04-30');

-- --------------------------------------------------------

--
-- Table structure for table `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `idTarea` int(11) NOT NULL,
  `idHistoria` int(11) NOT NULL,
  `idEstado` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reporte`
--

INSERT INTO `reporte` (`idReporte`, `idTarea`, `idHistoria`, `idEstado`, `nombre`) VALUES
(5, 7, 2, 1, NULL),
(6, 13, 2, 2, NULL),
(7, 22, 2, 2, NULL),
(8, 18, 2, 2, NULL),
(9, 10, 2, 2, NULL),
(10, 24, 2, 1, NULL),
(11, 20, 2, 3, NULL),
(12, 16, 2, 3, NULL),
(13, 14, 2, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL,
  `nombreTarea` varchar(64) DEFAULT NULL,
  `idFase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tarea`
--

INSERT INTO `tarea` (`idTarea`, `nombreTarea`, `idFase`) VALUES
(7, 'Test cases', 1),
(8, 'Verificación', 1),
(9, 'Wireframes', 2),
(10, 'Algoritmo', 2),
(11, 'Diagrama de componentes', 2),
(12, 'Actualizar Documentación', 2),
(13, 'Validación del Diseño', 2),
(14, 'Modelo DB', 3),
(15, 'Backend', 3),
(16, 'Frontend (lógica)', 3),
(17, 'Matriz de trazabilidad', 3),
(18, 'Verificación (Implementación)', 3),
(19, 'Validación (Implementación)', 3),
(20, 'Manual de usuario', 3),
(21, 'Manual de Arquitectura', 3),
(22, 'Pruebas de Integración', 3),
(23, 'Pruebas de Usabilidad', 4),
(24, 'Pruebas de Seguridad', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indexes for table `fase`
--
ALTER TABLE `fase`
  ADD PRIMARY KEY (`idFase`);

--
-- Indexes for table `historiausuario`
--
ALTER TABLE `historiausuario`
  ADD PRIMARY KEY (`idHistoria`),
  ADD KEY `idProyecto` (`idProyecto`);

--
-- Indexes for table `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`idProyecto`);

--
-- Indexes for table `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReporte`),
  ADD KEY `idHistoria` (`idHistoria`),
  ADD KEY `idEstado` (`idEstado`);

--
-- Indexes for table `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idFase` (`idFase`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fase`
--
ALTER TABLE `fase`
  MODIFY `idFase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `historiausuario`
--
ALTER TABLE `historiausuario`
  MODIFY `idHistoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `idProyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historiausuario`
--
ALTER TABLE `historiausuario`
  ADD CONSTRAINT `historiausuario_ibfk_1` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`);

--
-- Constraints for table `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`idHistoria`) REFERENCES `historiausuario` (`idHistoria`),
  ADD CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`);

--
-- Constraints for table `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idFase`) REFERENCES `fase` (`idFase`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
