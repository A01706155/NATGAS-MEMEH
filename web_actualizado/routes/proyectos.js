// Para proteger rutas
//const isAuth = require('../util/is-auth');

const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');


router.get('/registrar-proyecto', isAuth,  proyectosController.getRegistrarProyecto);

router.post('/registrar-proyecto', isAuth,  proyectosController.postRegistrarProyecto);

router.get('/modificar-proyecto/:proyecto_id',   proyectosController.getModificarProyecto);

router.post('/modificar-proyecto',   proyectosController.getModificarProyecto);

router.get('/:proyecto_id', isAuth,   proyectosController.getProyecto);

router.post('/buscar',   proyectosController.postBuscar);

router.get('/',   proyectosController.get);


module.exports = router;