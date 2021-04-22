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

/*exports.getRegistrarIteracion = (request, response, next) => {
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
    const nueva_iteracion = new Iteracion(request.body.idproyecto, request.body.descripcion, request.body.fechaPlaneada, request.body.fechaEntrega, request.body.estado);
    nueva_iteracion.save()
        .then(() => {
            response.redirect('/proyectos/iteracion/'+request.body.idproyecto);
            response.setHeader('Set-Cookie', ['ultima_iteracion='+nueva_iteracion.idIteracion+'; HttpOnly']);
        }).catch(err => console.log(err));

}*/
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
