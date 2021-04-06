const express = require('express');
const router = express.Router();
const path = require('path');
const proyectosController = require('../controllers/proyectos_controller');


router.get('/registrar-proyecto', proyectosController.getRegistrarProyecto);

router.post('/registrar-proyecto', proyectosController.postRegistrarProyecto);

router.get('/', proyectosController.get);
//router.get('/', proyectosController.getProyecto);



module.exports = router;