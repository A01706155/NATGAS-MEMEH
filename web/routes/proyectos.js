const express = require('express');
const router = express.Router();
const path = require('path');
const proyectosController = require('../controllers/proyectos_controller');


router.get('/proyectos/registrar-proyecto', funcionesController.getRegistrarProyecto);

router.post('/proyectos/registrar-proyecto', proyectoController.postRegistrarProyecto);

router.get('/proyectos', proyectoController.getProyecto);



module.exports = router;