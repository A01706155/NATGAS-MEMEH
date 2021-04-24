const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');
const Historiausuario = require('../models/casodeuso');
const AgilP = require('../models/ap');
const Reporte = require('../models/ap');






exports.get = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    Reporte.fetchAll()
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
    const idProyecto = request.params.casodeuso_id;
    console.log(request.params);
    Reporte.fetchByProject(idProyecto)
        .then(([rows, fieldData]) => {
            response.render('reporte', { 
                rol: request.session.rol,
                lista_reportes: rows, 
                titulo: 'Reportes'  ,
                idProyecto: idProyecto,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};