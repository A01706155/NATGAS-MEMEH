const session = require('express-session');
const Proyecto = require('../models/proyecto');
const Fase = require('../models/fase');
const Tarea = require('../models/tarea');

exports.getRegistrarTarea = (request, response, next) => {
    request.session.errortarea = "";
    const proyecto_id = request.params.proyecto_id;
    const fase_id = request.params.fase_id;
    
    Fase.fetchOneByFase(fase_id)
        .then(([rows, fieldData]) => {
            response.render('crear_tarea', { 
                fase: rows,
                idProyecto: proyecto_id,
                errortarea: request.session.errortarea,
                idFase: fase_id,
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
    let nombre = request.body.nombreTarea;
    let fase = request.body.idFase;
    let proyecto = request.body.idProyecto;
    console.log(nombre);

    Tarea.tareaRepetida(fase, nombre)
        .then(([rows, fieldData]) => {
            if (rows.length < 1) {
                const nueva_tarea = new Tarea(nombre, fase);
                nueva_tarea.save()
                    .then(() => {                       
                        response.setHeader('Set-Cookie', ['ultima_tarea='+nueva_tarea.nombreTarea+'; HttpOnly']);
                        response.redirect('/fases/' + proyecto);
                    }).catch(err => console.log(err));
            }
            else {
                request.session.errortarea = "Esa tarea ya existe";
                Fase.fetchOneByFase(fase)
                    .then(([rows, fieldData]) => {
                        response.render('crear_tarea', { 
                            fase: rows,
                            idProyecto: proyecto,
                            errortarea: request.session.errortarea,
                            idFase: fase,
                            csrfToken: request.csrfToken(),
                            titulo: 'Crear tarea',
                            isLoggedIn: request.session.isLoggedIn === true ? true : false
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        })
        .catch(err => {
            console.log(err);
        });

    
}
/*
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
*/
exports.getModificarTarea = (request, response, next) => {
    const id = request.params.tarea_id;
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

exports.postEliminarTarea = (request, response) => {
    
    const idTarea = request.body.idTarea;
    const id_proyecto = request.body.proyecto_id;
    console.log("aquiiiiii" + idTarea)
        Tarea.EliminarConexionTareasReporte(idTarea)
        Tarea.EliminarTarea(idTarea)
        
        .then(() => {
            request.session.alerta = "Tarea eliminada exitosamente";
            response.redirect('/fases/2');
        })
        .catch(err => {
            console.log(err);
        });
};