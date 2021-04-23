// Para proteger rutas
//const isAuth = require('../util/is-auth');

const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');

const casodeusoController = require('../controllers/casodeuso_controller');


router.get('/registrar-proyecto', isAuth, proyectosController.getRegistrarProyecto);

router.post('/registrar-proyecto', isAuth, proyectosController.postRegistrarProyecto);

router.get('/modificar-proyecto/:proyecto_id', isAuth, proyectosController.getModificarProyecto);

router.post('/modificar-proyecto', isAuth, proyectosController.postModificarProyecto);

router.get('/nuevo-casodeuso/:proyecto_id', isAuth, casodeusoController.getRegistrarCasodeuso);

router.post('/nuevo-casodeuso', isAuth, casodeusoController.postRegistrarCasodeuso);

router.get('/casodeuso/:proyecto_id' , isAuth,  proyectosController.getCasoUso);

router.get('/:proyecto_id', isAuth, proyectosController.getProyecto);

router.post('/buscar', proyectosController.postBuscar);

router.get('/', isAuth,   proyectosController.get);




module.exports = router;