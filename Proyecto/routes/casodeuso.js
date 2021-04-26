const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');

const casodeusoController = require('../controllers/casodeuso_controller');


router.get('/ver-casodeuso/:casodeuso_id', isAuth, casodeusoController.getCasodeUso);

router.get('/nuevo-casodeuso/:iteracion_id', isAuth, casodeusoController.getRegistrarCasodeuso);

router.post('/nuevo-casodeuso', isAuth, casodeusoController.postRegistrarCasodeuso);

router.get('/modificar-casodeuso/:casodeuso_id', isAuth, casodeusoController.getModificarCasodeuso);

router.post('/modificar-casodeuso', isAuth, casodeusoController.postModificarCasodeuso);

router.get('/reporte/:casodeuso_id',  casodeusoController.getReporte);

module.exports = router;