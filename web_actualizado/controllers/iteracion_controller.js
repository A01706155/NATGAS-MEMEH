const session = require('express-session');
const Iteracion = require('../models/iteracion');


exports.getIteracion = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getIteracion");
    Iteracion.fetchOne(id);
    console.log(id);
    Iteracion.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('iteracion', { 
                lista_iteraciones: rows, 
                Iteracion: rows,
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
        titulo: 'Registrar iteracion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarIteracion = (request, response, next) => {
    console.log(request.body.idIteracion);
    console.log(request.body.idproyecto);
    console.log(request.body.descripcion);
    console.log(request.body.fechaPlaneada);
    console.log(request.body.fechaEntrega);
    console.log(request.body.estado);
    const nueva_iteracion = new Iteracion(request.body.idproyecto, request.body.descripcion, request.body.fechaPlaneada, request.body.fechaEntrega, request.body.estado);
    nueva_iteracion.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultima_iteracion='+nueva_iteracion.idIteracion+'; HttpOnly']);
            response.redirect('/iteracion');
        }).catch(err => console.log(err));

}

exports.get = (request, response, next) => {
    console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);
    
    //Con cookie-parser
    console.log(request.cookies);
    console.log(request.cookies.ultima_iteracion);

    Iteracion.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('iteracion', { 
                user: request.session.usuario,
                lista_iteraciones: rows, 
                titulo: 'Iteracion',
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};