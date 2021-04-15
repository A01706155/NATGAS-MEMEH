const express = require('express');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');


router.get('/registrar-proyecto', proyectosController.getRegistrarProyecto);

router.post('/registrar-proyecto', proyectosController.postRegistrarProyecto);

router.post('/buscar', proyectosController.postBuscarProyecto);

router.get('/:proyecto_id', proyectosController.getProyecto);

router.get('/modificar/:proyecto_id', proyectosController.getProyectoModificar);

router.get('/', proyectosController.get);


module.exports = router;