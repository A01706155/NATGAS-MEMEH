const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/fases_controller');


router.get('/registrar-proyecto', isAuth, fasesController.getRegistrarFase);

router.post('/registrar-proyecto', isAuth, fasesController.postRegistrarFase);

router.get('/modificar-fase/:proyecto_id', fasesController.getModificarFase);

router.post('/modificar-fase', fasesController.postModificarFase);

router.get('/:proyecto_id', isAuth, fasesController.getProyectoFase);
