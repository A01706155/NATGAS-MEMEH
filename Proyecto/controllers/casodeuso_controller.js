const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');
const Historiausuario = require('../models/casodeuso');
const Reporte = require('../models/reporte');


exports.getCasodeUso = (request, response, next) => {
    const idHistoria = request.params.casodeuso_id;
    console.log("getCasodeUso");
    console.log(request.body);
    Historiausuario.fetchOne(idHistoria)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('ver_casodeuso', { 
                idHistoria: request.params.casodeuso_id,
                lista_historias: rows, 
                idProyecto:  request.body.idProyecto,
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
    console.log("proyecto: " + request.params.proyecto_id)
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
    const nuevo_casodeuso = new Historiausuario(request.body.ap, request.body.yo_como, request.body.quiero, request.body.para, request.body.comentario, request.body.idProyecto);
    nuevo_casodeuso.save()
        .then(() => {
            console.log(idProyecto);
            response.redirect('casodeuso/'+ request.body.idProyecto);
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

exports.getReporte = (request, response, next) => {
    const idHistoria = request.params.casodeuso_id;
    console.log(request.params);
    Reporte.fetchByProject(idHistoria)
        .then(([rows, fieldData]) => {
            response.render('reporte', { 
                rol: request.session.rol,
                lista_reportes: rows, 
                titulo: 'Reportes'  ,
                idHistoria: idHistoria,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};