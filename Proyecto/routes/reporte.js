const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');

const casodeusoController = require('../controllers/casodeuso_controller');

const reportesController = require('../controllers/reporte_controller')

router.get('/elegir-tareas/:proyecto_id/:casodeuso_id/', isAuth, reportesController.getReporte);

router.post('/elegir-tareas/:proyecto_id/:casodeuso_id/', isAuth, reportesController.postReporte);

router.get('/ver-reporte/:proyecto_id/:casodeuso_id/', isAuth, reportesController.getReporteLista);

router.post('/ver-reporte/:proyecto_id/:casodeuso_id/', isAuth, reportesController.postReporteEstado);

// router.post('/crear-reporte/:proyecto_id/:casodeuso_id/', isAuth, tareasController.postRegistrarTarea);

module.exports = router;