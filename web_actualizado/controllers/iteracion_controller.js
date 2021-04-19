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
    response.render('registrar_iteracion', {
        csrfToken: request.csrfToken(),
        titulo: 'Registrar iteracion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarIteracion = (request, response, next) => {
    console.log(request.body.idIteracion);
    const nueva_iteracion = new Iteracion(request.body.descripcion,request.body.fecha_inicio,request.body.fecha_fin,request.body.estadoIteracion);
    nueva_iteracion.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nueva_iteracion.idIteracion+'; HttpOnly']);
            response.redirect('/iteracion');
        }).catch(err => console.log(err));

}