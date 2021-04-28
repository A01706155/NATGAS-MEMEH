const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');
const Historiausuario = require('../models/casodeuso');
const Fase = require('../models/fase');
const Tarea = require('../models/tarea');
const Reporte = require('../models/reporte');
const Estado = require('../models/estado');



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
    const caso_id = request.params.casodeuso_id;
    const id = request.params.proyecto_id;
    idProyecto = id;
    request.session.errortareas = "";
    //console.log(request.params.proyecto_id);
    //console.log(request.params.casodeuso_id);
    Fase.fetchAll()
        .then(([rows, fieldData]) => {
            Tarea.fetchAll()
                .then(([rows2, fieldData]) => {
                    
                    Historiausuario.fetchAll()
                        .then(([rows3, fieldData]) => {
                            //console.log(rows);
                            //console.log(rows2);
                            //console.log(rows3);
                            response.render('reporte', { 
                                Fase: rows,
                                Tareas: rows2,
                                error : request.session.errortareas,
                                Historia: rows3,
                                id_historia: caso_id,
                                idProyecto: id,
                                csrfToken: request.csrfToken(),
                                titulo: 'Elegir tareas',
                                isLoggedIn: request.session.isLoggedIn === true ? true : false
                            });
                        })
                        .catch(err => {
                                console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

//Elegir tarea
exports.postReporte = (request, response, next) => {
    console.log(request.body.tarea);
    if (request.body.tarea == null) {
        console.log("Vacío");
        let caso_id = request.body.idHistoria;
        let id = request.body.proyecto_id;
        request.session.errortareas = "Seleccione al menos una tarea para continuar";

        Fase.fetchAll()
        .then(([rows, fieldData]) => {
            Tarea.fetchAll()
                .then(([rows2, fieldData]) => {
                    
                    Historiausuario.fetchAll()
                        .then(([rows3, fieldData]) => {
                            //console.log(rows);
                            //console.log(rows2);
                            //console.log(rows3);
                            response.render('reporte', { 
                                Fase: rows,
                                Tareas: rows2,
                                error : request.session.errortareas,
                                Historia: rows3,
                                id_historia: caso_id,
                                idProyecto: id,
                                csrfToken: request.csrfToken(),
                                titulo: 'Elegir tareas',
                                isLoggedIn: request.session.isLoggedIn === true ? true : false
                            });
                        })
                        .catch(err => {
                                console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });

    }
    else {
        for (let id of request.body.tarea) {
            //console.log("Post de Reporte");
            console.log(id);
            let reporte = new Reporte(
                id,
                request.params.casodeuso_id
            );
            reporte.save()
            .then()
            .catch(err =>{
                console.log(err);
            });
        }

        response.redirect('/proyectos/casodeuso/'+ request.params.proyecto_id);
    } 
}

exports.getReporteLista = (request, response, next) => {
    const caso_id = request.params.casodeuso_id;
    const id = request.params.proyecto_id;
    //console.log(request.params.proyecto_id);
    //console.log(request.params.casodeuso_id);
    Fase.fetchAll()
        .then(([rows, fieldData]) => {
            Tarea.fetchAll()
                .then(([rows2, fieldData]) => {
                    Estado.fetchAll()
                    .then(([rows3, fieldData]) => {
                        Historiausuario.fetchAll()
                        .then(([rows4, fieldData]) => {
                            Reporte.fetchAll()
                            .then(([rows5, fieldData]) => {
                                    response.render('ver_reporte', { 
                                        Fase: rows,
                                        Tareas: rows2,
                                        Estado: rows3,
                                        Historia: rows4,
                                        Reporte: rows5,
                                        id_historia: caso_id,
                                        idProyecto: id,
                                        csrfToken: request.csrfToken(),
                                        titulo: 'Reporte',
                                        idHistoria: caso_id,
                                        isLoggedIn: request.session.isLoggedIn === true ? true : false
                                    });
                                })
                                    .catch(err => {
                                        console.log(err);
                                });
                            })
                        .catch(err => {
                                console.log(err);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};


//Cambiar estado
exports.postReporteLista = (request, response, next) => {
    console.log(request.body.tarea);
    if (request.body.tarea == null) {
        console.log("Vacío");
    }

    else {
        for (let id of request.body.tarea) {
            //console.log("Post de Reporte");
            console.log(id);
            let reporte = new Reporte(
                id,
                request.params.casodeuso_id
            );
            reporte.save()
            .then()
            .catch(err =>{
                console.log(err);
            });
        }
    
        response.redirect('/proyectos/casodeuso/'+ request.params.proyecto_id);
    }
}
