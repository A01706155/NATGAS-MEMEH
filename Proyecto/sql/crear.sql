DROP DATABASE IF EXISTS `NATGAS_MEMEH`;
CREATE DATABASE `NATGAS_MEMEH`; 
USE `NATGAS_MEMEH`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE Proyecto (
    idProyecto INT AUTO_INCREMENT NOT NULL,
    nombreProyecto VARCHAR(64),
    descripcion VARCHAR(1000),
    fechaPlaneada DATE,
    fechaEntrega DATE,
    PRIMARY KEY(idProyecto)
);


CREATE TABLE Empleado (
    idEmpleado INT AUTO_INCREMENT NOT NULL,
    usuario VARCHAR(14),       
    nombreEmpleado VARCHAR(64),
    contrasena VARCHAR(100),
    rol INT(1),
    PRIMARY KEY(idEmpleado)
);


CREATE TABLE Fase (
    idFase INT AUTO_INCREMENT NOT NULL,
    nombreFase VARCHAR(64),
    PRIMARY KEY(idFase)
);


CREATE TABLE Tarea (
    idTarea INT AUTO_INCREMENT NOT NULL,
    nombreTarea VARCHAR(64),
    idFase INT NOT NULL,
    PRIMARY KEY(idTarea),
    FOREIGN KEY(idFase) REFERENCES Fase(idFase)
);


CREATE TABLE HistoriaUsuario(
    idHistoria INT AUTO_INCREMENT NOT NULL, 
    yo_como VARCHAR(64),
    quiero VARCHAR(255), 
    para VARCHAR(255), 
    comentario VARCHAR(255), 
    AP INT NOT NULL, 
    idProyecto INT,
    iteracion INT(3),
    PRIMARY KEY(idHistoria),
    FOREIGN KEY(idProyecto) REFERENCES Proyecto(idProyecto)
);

CREATE TABLE Estado (
    idEstado INT AUTO_INCREMENT NOT NULL,
    Estado INT (1),
    PRIMARY KEY(idEstado)
);


CREATE TABLE Reporte (
    idReporte INT AUTO_INCREMENT NOT NULL,
    idTarea INT NOT NULL, 
    idHistoria INT NOT NULL,
    idEstado INT NOT NULL,
    nombre VARCHAR(150), 
    PRIMARY KEY(idReporte),
    FOREIGN KEY(idHistoria) REFERENCES HistoriaUsuario(idHistoria),
    FOREIGN KEY(idEstado) REFERENCES Estado(idEstado)
);

INSERT INTO `estado` (`idEstado`, `Estado`) VALUES
(1, 'Pendiente'),
(2, 'En progreso'),
(3, 'Terminado');

INSERT INTO `fases` (`idFase`, `nombreFase`) VALUES
(1, `Análisis`),
(2, `Diseño`),
(3, `Implementación`),
(4, `Pruebas`);