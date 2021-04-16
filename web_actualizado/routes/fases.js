const express = require('express');

const router = express.Router();

const path = require('path');

const fasesController = require('../controllers/fases_controller');


router.get('/registrar-fase', fasesController.getRegistrarFase);

router.post('/registrar-fase', fasesController.postRegistrarFase);

router.get('/:id_proyecto', fasesController.getFaseProyecto);

router.get('/', fasesController.get);

module.exports = router;