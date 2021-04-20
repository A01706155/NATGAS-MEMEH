const session = require('express-session');
const Proyecto = require('../models/proyecto');
const Fase = require('../models/fase');
const Tarea = require('../models/tarea');

exports.getRegistrarTarea = (request, response, next) => {
    const id = request.params.fase_id;
    
    Fase.fetchOneByFase(id)
        .then(([rows, fieldData]) => {
            response.render('crear_tarea', { 
                fase: rows,
                csrfToken: request.csrfToken(),
                titulo: 'Crear tarea',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postRegistrarTarea = (request, response, next) => {
    console.log(request.body.nombreTarea);
    const nueva_tarea = new Tarea(request.body.nombreTarea, request.body.idFase);
    nueva_tarea.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultima_tarea='+nueva_tarea.nombreTarea+'; HttpOnly']);
            response.redirect('/proyectos');
        }).catch(err => console.log(err));
}

exports.getFaseTarea = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getFases");
    Fase.fetchOne(id);
    console.log(id);
    //console.log(request.session.rol);
    Fase.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('WBS_proyecto', { 
                Fase: rows,
                idProyecto: id,
                csrfToken: request.csrfToken(),
                titulo: 'Fases',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getModificarTarea = (request, response, next) => {
    const id = request.params.fase_id;
    console.log("getModificar");
    console.log(id);
    Fase.fetchOneByFase(id)
        .then(([rows, fieldData]) => {
            response.render('modificar_fase', { 
                csrfToken: request.csrfToken(),
                fase: rows,
                titulo: 'Modificar fase',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postModificarTarea = (request, response, next) => {
    const id_proyecto = request.body.idProyecto;
    console.log("Se esta modificando la fase");
    console.log(request.body);
    Fase.modify(request.body.nombreFase, request.body.idFase)
        .then(() => {
            response.redirect('/fases/' + id_proyecto);
        }).catch(err => console.log(err));
}