

const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');

const iteracionController = require('../controllers/iteracion_controller');

router.get('/nueva-iteracion', isAuth, iteracionController.getRegistrarIteracion);

router.post('/nueva-iteracion', isAuth, iteracionController.postRegistrarIteracion);

router.get('/iteracion', isAuth, iteracionController.get);


module.exports = router;