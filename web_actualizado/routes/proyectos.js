// Para proteger rutas
//const isAuth = require('../util/is-auth');

const express = require('express');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');


router.get('/registrar-proyecto',   proyectosController.getRegistrarProyecto);

router.post('/registrar-proyecto',   proyectosController.postRegistrarProyecto);

router.get('/modificar-proyecto/:proyecto_id',   proyectosController.getModificarProyecto);

router.post('/modificar-proyecto',   proyectosController.getModificarProyecto);

router.get('/:proyecto_id',   proyectosController.getProyecto);

router.post('/buscar',   proyectosController.postBuscar);

router.get('/',   proyectosController.get);


module.exports = router;