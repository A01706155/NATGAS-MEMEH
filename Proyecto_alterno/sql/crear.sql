    DROP DATABASE IF EXISTS `NATGAS_MEMEH_N`;
    CREATE DATABASE `NATGAS_MEMEH_N`; 
    USE `NATGAS_MEMEH_N`;
    
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
        idProyecto INT NOT NULL,
        PRIMARY KEY(idTarea),
        FOREIGN KEY(idFase) REFERENCES Fase(idFase),
        FOREIGN KEY(idProyecto) REFERENCES Proyecto(idProyecto)
    );


    CREATE TABLE HistoriaUsuario(
        idHistoria INT AUTO_INCREMENT NOT NULL, 
        yo_como VARCHAR(64),
        quiero VARCHAR(255), 
        para VARCHAR(255), 
        comentario VARCHAR(255), 
        AP INT NOT NULL, 
        idProyecto INT,
        PRIMARY KEY(idHistoria),
        FOREIGN KEY(idProyecto) REFERENCES Proyecto(idProyecto)
    );

    
    CREATE TABLE Reporte (
        idReporte INT AUTO_INCREMENT NOT NULL,
        idTarea INT NOT NULL, 
        idHistoria INT NOT NULL,
        PRIMARY KEY(idReporte),
        FOREIGN KEY(idHistoria) REFERENCES HistoriaUsuario(idHistoria)
    );