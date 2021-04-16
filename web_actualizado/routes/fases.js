// Para proteger rutas
const isAuth = require('../util/is-auth');

const express = require('express');

const router = express.Router();

const path = require('path');

const fasesController = require('../controllers/fases_controller');

router.get('/registrar-fase/:proyecto_id', isAuth, fasesController.getRegistrarFase);

router.post('/registrar-fase/:proyecto_id', isAuth, fasesController.postRegistrarFase);

router.get('/:proyecto_id', isAuth, fasesController.getFaseProyecto);

router.get('/', isAuth, fasesController.get);

module.exports = router;