    DROP DATABASE IF EXISTS `NATGAS_MEMEH_EXPERIMENTAL`;
    CREATE DATABASE `NATGAS_MEMEH_EXPERIMENTAL`; 
    USE `NATGAS_MEMEH_EXPERIMENTAL`;
    
    SET NAMES utf8;
    SET character_set_client = utf8mb4;

    CREATE TABLE AP (
        idAP INT AUTO_INCREMENT NOT NULL,
        AP INT,
        PRIMARY KEY(idAP)
    );


    CREATE TABLE Proyecto (
        idProyecto INT AUTO_INCREMENT NOT NULL,
        nombreProyecto VARCHAR(64),
        descripcion VARCHAR(1000),
        fechaPlaneada DATE,
        fechaEntrega DATE,
        estadoProyecto INT,
        PRIMARY KEY(idProyecto)
    );


    CREATE TABLE Iteracion (
        idIteracion INT AUTO_INCREMENT NOT NULL,
        idProyecto INT NOT NULL,
        descripcion VARCHAR(1000),
        fechaPlaneada DATE,
        fechaEntrega DATE,
        estadoIteracion INT,
        PRIMARY KEY(idIteracion),
        FOREIGN KEY(idProyecto) REFERENCES Proyecto(idProyecto)
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


    CREATE TABLE tarea (
        idTarea INT AUTO_INCREMENT NOT NULL,
        nombreTarea VARCHAR(64),
        idFase INT NOT NULL,
        PRIMARY KEY(idTarea),
        FOREIGN KEY(idFase) REFERENCES Fase(idFase)
    );


    CREATE TABLE ProyectoFaseTarea (
        idProyecto INT NOT NULL,
        idFase INT NOT NULL,
        idTarea INT NOT NULL,
        PRIMARY KEY(idProyecto, idFase, idTarea),
        FOREIGN KEY(idProyecto) REFERENCES Proyecto(idProyecto),
        FOREIGN KEY(idTarea) REFERENCES tarea(idTarea)
    );


    CREATE TABLE Casos_Uso(
        idCaso INT AUTO_INCREMENT NOT NULL, 
        idAP INT NOT NULL, 
        idIteracion INT NOT NULL,
        yo_como VARCHAR(64),
        quiero VARCHAR(255), 
        para VARCHAR(255), 
        comentario VARCHAR(255), 
        PRIMARY KEY(idCaso), 
        FOREIGN KEY(idAP) REFERENCES AP(idAP), 
        FOREIGN KEY(idIteracion) REFERENCES Iteracion(idIteracion)
    );

    
    CREATE TABLE Entrega (
        idProyecto INT NOT NULL,
        idFase INT NOT NULL,
        idTarea INT NOT NULL, 
        idCaso INT NOT NULL, 
        nombre VARCHAR(150), 
        PRIMARY KEY(idProyecto, idFase, idTarea, idCaso),
        FOREIGN KEY(idProyecto, idFase, idTarea) REFERENCES ProyectoFaseTarea(idProyecto, idFase, idTarea),
        FOREIGN KEY(idCaso) REFERENCES Casos_Uso(idCaso)
    );