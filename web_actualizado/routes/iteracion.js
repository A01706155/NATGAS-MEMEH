

const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');

const iteracionController = require('../controllers/iteracion_controller');

const casodeusoController = require('../controllers/casodeuso_controller');

router.get('/nueva-iteracion', isAuth, iteracionController.getRegistrarIteracion);

router.post('/nueva-iteracion', isAuth, iteracionController.postRegistrarIteracion);

router.get('/nuevo-casodeuso/:iteracion_id', isAuth, casodeusoController.getRegistrarCasodeuso);

router.post('/nuevo-casodeuso', isAuth, casodeusoController.postRegistrarCasodeuso);

// router.get('/iteracion', isAuth, iteracionController.get);

router.get('/ver-iteracion/:iteracion_id', isAuth, iteracionController.getIteracion);

router.get('/casosdeuso/:iteracion_id' , isAuth,  iteracionController.getCasoUso);

router.get('/modificar-iteracion/:iteracion_id', isAuth, iteracionController.getModificarIteracion);

router.post('/modificar-iteracion', isAuth, iteracionController.postModificarIteracion);

router.post('/eliminar-iteracion', isAuth, iteracionController.postEliminarIteracion);

module.exports = router;