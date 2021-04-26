const session = require('express-session');
const Proyecto = require('../models/proyecto');
const Iteracion = require('../models/iteracion');
const Historiausuario = require('../models/casodeuso');
const Reporte = require('../models/reporte');


exports.getRegistrarProyecto = (request, response, next) => {
    response.render('registrar_proyecto', {
        csrfToken: request.csrfToken(),
        titulo: 'Registrar proyecto',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegistrarProyecto = (request, response, next) => {
    console.log(request.body.nombreProyecto);
    const nuevo_proyecto = new Proyecto(request.body.nombreProyecto,request.body.descripcion,request.body.fecha_inicio,request.body.fecha_fin,request.body.estado);
    nuevo_proyecto.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nuevo_proyecto.nombreProyecto+'; HttpOnly']);
            response.redirect('/proyectos');
        }).catch(err => console.log(err));

}

exports.postBuscar = (request, response, next) => {
    console.log(request.body);
    console.log(request.body.valor_busqueda);
    const name = request.body.valor_busqueda;
    Proyecto.fetchByName(name)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
    
};

exports.getProyecto = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getContenido");
    Proyecto.fetchOne(id);
    console.log(id);
    //console.log(request.session.rol);
    Proyecto.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('ver_proyecto', { 
                Proyecto: rows,
                csrfToken: request.csrfToken(),
                titulo: 'Trabajo del proyecto',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getModificarProyecto = (request, response, next) => {
    const id = request.params.proyecto_id;
 
    Proyecto.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('modificar_proyecto', { 
                
                proyecto: rows,
                titulo: 'Modificar proyecto',
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postModificarProyecto = (request, response, next) => {
    console.log("Se esta modificando");
    console.log(request.body);
    Proyecto.modify(request.body.nombreProyecto, request.body.descripcion, request.body.fecha_inicio, request.body.fecha_fin, request.body.idProyecto)
        .then(() => {
            response.redirect('/proyectos');
        }).catch(err => console.log(err));

}

exports.get = (request, response, next) => {
    console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);
    
    //Con cookie-parser
    console.log(request.cookies);
    console.log(request.cookies.ultimo_proyecto);

    Proyecto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('proyectos', { 
                user: request.session.usuario,
                lista_proyecto: rows, 
                titulo: 'Proyectos',
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCaso = (request, response, next) => {
    const idProyecto = request.params.proyecto_id;
    console.log(request.params);
    Historiausuario.fetchByProject(idProyecto)
        .then(([rows, fieldData]) => {
            response.render('casodeuso', { 
                rol: request.session.rol,
                lista_historias: rows, 
                titulo: 'Casos de uso'  ,
                csrfToken: request.csrfToken(),
                idProyecto: idProyecto,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEliminarProyecto = (request, response) => {
    const idProyecto = request.body.idProyecto;
    const id_proyecto = request.body.proyecto_id;
    console.log("idProyecto: " + idProyecto)
        Proyecto.EliminarConexionProyectoHistoriaUsuario(idProyecto)
        Proyecto.EliminarProyecto(idProyecto)
        .then(() => {
            request.session.alerta = "Proyecto eliminado exitosamente";
            response.redirect('/proyectos');
        })
        .catch(err => {
            console.log(err);
        });
};