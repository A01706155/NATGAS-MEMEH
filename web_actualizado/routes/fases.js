const express = require('express');

const router = express.Router();

const path = require('path');

const fasesController = require('../controllers/fases_controller');


router.get('/registrar-fase/:proyecto_id', fasesController.getRegistrarFase);

router.post('/registrar-fase/:proyecto_id', fasesController.postRegistrarFase);

router.get('/:proyecto_id', fasesController.getFaseProyecto);

router.get('/', fasesController.get);

module.exports = router;