const session = require('express-session');
const Iteracion = require('../models/iteracion');
const Proyecto = require('../models/proyecto');
const Historiausuario = require('../models/casodeuso');
const Fase = require('../models/fase');
const Tarea = require('../models/tarea');
const Reporte = require('../models/reporte');



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

exports.postReporte = (request, response, next) => {
    console.log(request.body);
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