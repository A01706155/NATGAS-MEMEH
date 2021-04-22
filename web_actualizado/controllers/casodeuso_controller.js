const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');
const Casodeuso = require('../models/casodeuso');


exports.getCasodeUso = (request, response, next) => {
    const idCaso = request.params.casodeuso_id;
    console.log("getCasodeUso");
    Casodeuso.fetchOne(idCaso)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('ver_casodeuso', { 
                lista_casodeuso: rows, 
                idIteracion: request.session.idIteracion,
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

exports.getRegistrarCasodeuso = (request, response, next) => {
    response.render('register_casodeuso', {
        csrfToken: request.csrfToken(),
        Casodeuso: request.session.idCaso,
        idIteracion: request.params.iteracion_id,
        idAP: request.params.ap_id,
        titulo: 'Registrar Caso de uso',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarCasodeuso = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    const nuevo_casodeuso = new Casodeuso(request.body.idIteracion, request.body.idAP, request.body.yo_como, request.body.quiero, request.body.para, request.body.comentario);
    nuevo_casodeuso.save()
        .then(() => {
            response.redirect('/iteracion/casosdeuso/'+request.body.idIteracion);
            response.setHeader('Set-Cookie', ['ultimo_casodeuso='+nuevo_casodeuso.idCaso+'; HttpOnly']);
        }).catch(err => console.log(err));

}
exports.get = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    Casodeuso.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('casodeuso', { 
                lista_casodeuso: rows, 
                titulo: 'Caso de Uso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false,
            });
        })
        .catch(err => {
            console.log(err);
        });
};
