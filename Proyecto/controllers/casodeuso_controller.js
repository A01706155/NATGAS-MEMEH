const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');
const Historiausuario = require('../models/casodeuso');
const AgilP = require('../models/ap');


exports.getCasodeUso = (request, response, next) => {
    const idHistoria = request.params.historia_id;
    console.log("getCasodeUso");
    Historiausuario.fetchOne(idCaso)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('ver_casodeuso', { 
                lista_casodeuso: rows, 
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
    Historiausuario.fetchAll()
    .then(([rows, fieldData]) => {
            response.render('register_casodeuso', {
                csrfToken: request.csrfToken(),
                idHistoria: request.session.idHistoria,
                idProyecto: request.params.proyecto_id,
                titulo: 'Registrar Historia',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postRegistrarCasodeuso = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log(request.body);
    const nuevo_casodeuso = new Historiausuario(request.body.idProyecto, request.body.yo_como, request.body.quiero, request.body.para, request.body.comentario, request.body.AP);
    nuevo_casodeuso.save()
        .then(() => {
            response.redirect('casodeuso/'+request.body.idProyecto);
            response.setHeader('Set-Cookie', ['ultimo_casodeuso='+nuevo_casodeuso.idCaso+'; HttpOnly']);
        }).catch(err => console.log(err));

}
exports.get = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    Historiausuario.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('casodeuso', { 
                lista_historias: rows, 
                titulo: 'Caso de Uso',
                isLoggedIn: request.session.isLoggedIn === true ? true : false,
            });
        })
        .catch(err => {
            console.log(err);
        });
};
