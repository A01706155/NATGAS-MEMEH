const session = require('express-session');
const Proyecto = require('../models/proyecto');
const Fase = require('../models/fase');


exports.getRegistrarFase = (request, response, next) => {
    const id = request.params.proyecto_id;
    response.render('registrar_fase', {
        csrfToken: request.csrfToken(),
        titulo: 'Registrar fase nueva',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarFase = (request, response, next) => {
    console.log(request.body.nombreFase);
    const nueva_fase = new Fase(request.body.nombreFase, request.body.estado);
    nueva_fase.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nueva_fase.nombreFase+'; HttpOnly']);
            response.redirect('/fases');
        }).catch(err => console.log(err));

}

exports.getProyectoFase = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getFases");
    Fase.fetchOne(id);
    console.log(id);
    //console.log(request.session.rol);
    Proyecto.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('WBS_proyecto', { 
                Fase: rows,
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
    Fase.fetchOne(id)
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

exports.postModificarFase = (request, response, next) => {
    const id_proyecto = request.body.idProyecto;
    console.log("Se esta modificando la fase");
    console.log(request.body);
    Fase.modify(request.body.nombreFase, id_proyecto)
        .then(() => {
            response.redirect('/fases/' + id_proyecto);
        }).catch(err => console.log(err));

}