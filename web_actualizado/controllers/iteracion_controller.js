const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');


exports.getIteracion = (request, response, next) => {
    const idUseCase = request.params.casodeuso_id;
    const idProyecto = request.params.proyecto_id;
    console.log("getIteracion");
    console.log(idUseCase);
    Iteracion.fetchOne(idUseCase)
        .then(([rows, fieldData]) => {
            response.render('ver_iteracion', { 
                lista_iteraciones: rows, 
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
        idProyecto:  request.params.proyecto_id,
        titulo: 'Registrar iteracion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarIteracion = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log(request.body.idIteracion);
    const nueva_iteracion = new Iteracion(request.body.idProyecto,request.body.descripcion,request.body.fechaPlaneada,request.body.fechaEntrega,request.body.estadoIteracion);
    nueva_iteracion.save()
        .then(() => {
            response.redirect('/proyectos/iteracion/'+request.body.idProyecto);
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
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};