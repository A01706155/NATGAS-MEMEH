const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const tareasController = require('../controllers/tareas_controller');


router.get('/registrar-tarea/:fase_id', isAuth, tareasController.getRegistrarTarea);

router.post('/registrar-tarea', isAuth, tareasController.postRegistrarTarea);

router.get('/modificar-tarea/:tarea_id', tareasController.getModificarTarea);

router.post('/modificar-tarea', tareasController.postModificarTarea);

//router.get('/:proyecto_id', isAuth, fasesController.getFaseTarea);


module.exports = router;