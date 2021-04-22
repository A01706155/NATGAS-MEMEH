const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const fasesController = require('../controllers/fases_controller');


router.get('/registrar-fase/:proyecto_id', isAuth, fasesController.getRegistrarFase);

router.post('/registrar-fase', isAuth, fasesController.postRegistrarFase);

router.get('/modificar-fase/:fase_id', fasesController.getModificarFase);

//router.post('/modificar-fase', fasesController.postModificarFase);

router.get('/:proyecto_id', isAuth, fasesController.getProyectoFase);


module.exports = router;