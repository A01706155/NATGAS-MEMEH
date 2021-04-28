// Para proteger rutas
//const isAuth = require('../util/is-auth');

const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/users_controller');


router.get('/login', usersController.getLogin);

router.post('/login', usersController.postLogin);

router.get('/logout',   usersController.getLogout);

router.get('/register', usersController.getRegister);

router.post('/register', usersController.postRegister);

router.get('/modificar_empleado', usersController.getEmpleado);

router.get('/modificar/:empleado_id', usersController.getModificarEmpleado); //modificar

router.post('/modificar-contrasena', usersController.postModificarContrasena); 

router.post('/modificar', usersController.postModificarEmpleado); 

router.post('/eliminarEmpleado', usersController.postEliminarEmpleado);

module.exports = router;