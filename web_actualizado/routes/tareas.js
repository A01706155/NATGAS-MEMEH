const express = require('express');

const isAuth = require('../util/is-auth');

const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const tareasController = require('../controllers/tareas_controller');


router.get('/registrar-tarea/:fase_id', isAuth, fasesController.getRegistrarTarea);

router.post('/registrar-tarea', isAuth, fasesController.postRegistrarTarea);

router.get('/modificar-tarea/:tarea_id', fasesController.getModificarTarea);

router.post('/modificar-tarea', fasesController.postModificarTarea);

router.get('/:proyecto_id', isAuth, fasesController.getProyectoFase);


module.exports = router;