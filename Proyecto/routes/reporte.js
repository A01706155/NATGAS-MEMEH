const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

const path = require('path');

const proyectosController = require('../controllers/proyectos_controller');



const casodeusoController = require('../controllers/casodeuso_controller');



module.exports = router;