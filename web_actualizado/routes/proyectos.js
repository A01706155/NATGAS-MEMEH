// Para proteger rutas
const isAuth = require('../util/is-auth');

const express = require('express');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');


router.get('/registrar-proyecto', isAuth, proyectosController.getRegistrarProyecto);

router.post('/registrar-proyecto', isAuth, proyectosController.postRegistrarProyecto);

router.get('/:proyecto_id', isAuth, proyectosController.getProyecto);

router.get('/modificar/:proyecto_id', isAuth, proyectosController.getProyectoModificar);

router.post('/buscar', isAuth, proyectosController.postBuscar);

router.get('/', isAuth, proyectosController.get);


module.exports = router;