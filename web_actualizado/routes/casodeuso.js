const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');

const iteracionController = require('../controllers/iteracion_controller');

const casodeusoController = require('../controllers/casodeuso_controller');

router.get('/ver-casodeuso/:casodeuso_id', isAuth, casodeusoController.getCasodeUso);

module.exports = router;