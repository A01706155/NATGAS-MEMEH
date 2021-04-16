const Fase = require('../models/fase');
const session = require('express-session');

exports.getRegistrarFase = (request, response, next) => {
    response.render('registrar_proyecto', {
        titulo: 'Registrar fase',
    });
};

exports.postRegistrarFase = (request, response, next) => {
    console.log(request.body.nombreProyecto);
    const nueva_fase = new Fase(request.body.nombreProyecto,request.body.descripcion,request.body.fecha_inicio,request.body.fecha_fin);
    nueva_fase.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nueva_fase.nombreFase+'; HttpOnly']);
            response.redirect('/proyectos');
        }).catch(err => console.log(err));

}

exports.getFaseProyecto = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getContenido");
    Fase.fetchByProject(id);
    console.log(id);
    //console.log(request.session.rol);
    Fase.fetchByProject(id)
        .then(([rows, fieldData]) => {
            response.render('fase_por_proyecto', { 
                lista_fases: rows,
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