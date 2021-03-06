const express = require('express');

const router = express.Router();

const path = require('path');

//const isAuth = require('../utils/is-auth.js');

const casosdeusoController = require('../controllers/casosdeuso_controller');


router.get('/crear-casoDeUso',   casosdeusoController.getNuevoCasoDeUso);

router.post('/crear-casoDeUso',   casosdeusoController.postNuevoCasoDeUso);

router.get('/',   casosdeusoController.get);

router.post('/eliminar-casoDeUso',   casosdeusoController.postEliminarCasoDeUso);

router.post('/actualizarCaso',   casosdeusoController.postActualizarCasoDeUso);

router.get('/actualizarCaso',   casosdeusoController.getActualizarCasoDeUso);

router.get('/:casodeuso_id/:proyecto_id' ,    casosdeusoController.getTareas  );

router.get('/:casodeuso_id',    casosdeusoController.getActualizarCasoDeUso);  

router.post('/:casodeuso_id',   casosdeusoController.postActualizarCasoDeUso);


module.exports = router;