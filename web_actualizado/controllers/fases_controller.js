const Fase = require('../models/fase');
const session = require('express-session');

exports.getRegistrarFase = (request, response, next) => {
    response.render('registrar_fase', {
        titulo: 'Registrar fase',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarFase = (request, response, next) => {
    console.log(request.body.nombreFase);
    const id = request.params.proyecto_id;
    console.log(id);
    const nueva_fase = new Fase(request.body.numFase, request.body.nombreFase, id);
    nueva_fase.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nueva_fase.nombreFase+'; HttpOnly']);
            response.redirect('/fases/' + id);
        }).catch(err => console.log(err));

}

exports.getFaseProyecto = (request, response, next) => {
    const id = request.params.proyecto_id;
    Fase.fetchByProject(id);
    console.log("getContenido");
    console.log(id);
    //console.log(request.session.rol);
    Fase.fetchByProject(id)
        .then(([rows, fieldData]) => {
            response.render('fases_por_proyecto', { 
                datos_fases: rows,
                //rol: request.session.rol,
                titulo: 'Fases del proyecto',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.get = (request, response, next) => {
    console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);
    
    //Con cookie-parser
    console.log(request.cookies);

    Fase.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('fases', { 
                lista_fases: rows, 
                titulo: 'Fases',
                //csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};