const session = require('express-session');
const Casodeuso = require('../models/casodeuso');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');


exports.getIteracion = (request, response, next) => {
    const idIteracion = request.params.iteracion_id;
    console.log("getIteracion");
    Iteracion.fetchOne(idIteracion)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('ver_iteracion', { 
                detalles_iteracion: rows, 
                Iteracion: request.session.idIteracion,
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

exports.getRegistrarIteracion = (request, response, next) => {
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

}

exports.get = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    Iteracion.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('iteracion', { 
                lista_iteraciones: rows, 
                titulo: 'Iteracion',
                isLoggedIn: request.session.isLoggedIn === true ? true : false,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getModificarIteracion = (request, response, next) => {
    const idIteracion = request.params.iteracion_id;
 
    
    Iteracion.fetchOne(idIteracion)
        .then(([rows, fieldData]) => {
            response.render('modificar_iteracion', { 
                detalles_iteracion: rows,  
                titulo: 'Modificar Iteracion',
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postModificarIteracion = (request, response, next) => {
    console.log("Se esta modificando");
    console.log(request.body);
    console.log("Empezamos bb");
    Iteracion.modify(request.body.idProyecto, request.body.estadoIteracion, request.body.descripcion,
        request.body.fechaPlaneada, request.body.fechaEntrega, request.body.idIteracion)
        .then(() => {
            response.redirect('/proyectos/iteracion/'+request.body.idProyecto);
        }).catch(err => console.log(err));

}

exports.postEliminarIteracion = (request, response) => {
    console.log("si llegue carnal")
    const idIteracion = request.body.iteracion_id;
    console.log(request.body);
    Iteracion.EliminarIteracion(idIteracion)
    .then(() => {
        console.log("si entre carnal")
        request.session.alerta = "Caso de uso eliminado exitosamente";
        response.redirect('/proyectos/iteracion/'+request.body.idProyecto);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getCasoUso = (request, response, next) => {
    const idIteracion = request.params.iteracion_id;
    console.log(request.params);
    Casodeuso.fetchByIteracion(idIteracion)
        .then(([rows, fieldData]) => {
            response.render('casodeuso', { 
                rol: request.session.rol,
                lista_casodeuso: rows, 
                titulo: 'Casos de uso'  ,
                idIteracion: idIteracion,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};