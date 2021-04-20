const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');


exports.getIteracion = (request, response, next) => {
    const idIteracion = request.params.iteracion_id;
    console.log("getIteracion");
    Iteracion.fetchOne(idIteracion)
        .then(([rows, fieldData]) => {
            response.render('ver_iteracion', { 
                detalles_iteracion: rows, 
                Iteracion: request.session.idIteracion,
                idProyecto:  request.params.proyecto_id,
                csrfToken: request.csrfToken(),
                titulo: 'Trabajo del proyecto',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRegistrarIteracion = (request, response, next) => {
    response.render('register_iteracion', {
        csrfToken: request.csrfToken(),
        Iteracion: request.session.idIteracion,
        idProyecto: request.params.proyecto_id,
        titulo: 'Registrar iteracion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarIteracion = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log(request.body.idproyecto);
    console.log(request.body.descripcion);
    console.log(request.body.fechaPlaneada);
    console.log(request.body.fechaEntrega);
    console.log(request.body.estado);
    const nueva_iteracion = new Iteracion(request.body.idproyecto, request.body.descripcion, request.body.fechaPlaneada, request.body.fechaEntrega, request.body.estado);
    nueva_iteracion.save()
        .then(() => {
            response.redirect('/proyectos/iteracion/'+request.body.idproyecto);
            response.setHeader('Set-Cookie', ['ultima_iteracion='+nueva_iteracion.idIteracion+'; HttpOnly']);
        }).catch(err => console.log(err));

}

exports.get = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    Iteracion.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('iteracion', { 
                lista_iteraciones: rows, 
                titulo: 'Iteracion',
                isLoggedIn: request.session.isLoggedIn === true ? true : false,
            });
        })
        .catch(err => {
            console.log(err);
        });
};