const session = require('express-session');
const Proyecto = require('../models/proyecto');
const Fase = require('../models/fase');
const Tarea = require('../models/tarea');


exports.getRegistrarFase = (request, response, next) => {
    const id = request.params.proyecto_id;
    
    Proyecto.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('registrar_fase', { 
                proyecto: rows,
                idProyecto: id,
                csrfToken: request.csrfToken(),
                titulo: 'Registrar nueva fase',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postRegistrarFase = (request, response, next) => {
    console.log(request.body.nombreFase);
    const nueva_fase = new Fase(request.body.nombreFase, request.body.idProyecto);
    nueva_fase.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nueva_fase.nombreFase+'; HttpOnly']);
            response.redirect('/fases/' + request.body.idProyecto);
        }).catch(err => console.log(err));
}

exports.getFases = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getFases");
    Fase.fetchAll();
    //console.log(request.session.rol);
    Fase.fetchAll()
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

exports.getModificarFase = (request, response, next) => {
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

exports.getProyectoFase = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getFases");
    Proyecto.fetchOne(id);
    console.log(id);
    //console.log(request.session.rol);
    Fase.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('WBS_proyecto', { 
                Fase: rows,
                csrfToken: request.csrfToken(),
                idProyecto: id,
                titulo: 'Fases',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postModificarFase = (request, response, next) => {
    const id_proyecto = request.body.idProyecto;
    console.log("Se esta modificando la fase");
    console.log(request.body);
    Fase.modify(request.body.nombreFase, id_proyecto)
        .then(() => {
            response.redirect('/fases/' + id_proyecto);
        }).catch(err => console.log(err));

}