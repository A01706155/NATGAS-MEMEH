const Proyecto = require('../models/proyecto');

exports.getRegistrarProyecto = (request, response, next) => {
    response.render('registrar_proyecto', {
        titulo: 'Registrar proyecto',
        isLoggedIn: request.session.isLoggedIn === true ? true : false,
    });
};

exports.postRegistrarProyecto = (request, response, next) => {
    console.log(request.body.nombreProyecto);
    const nuevo_proyecto = new Proyecto(request.body.nombreProyecto,request.body.descripcion,request.body.fecha_inicio,request.body.fecha_fin);
    nuevo_proyecto.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nuevo_proyecto.nombreProyecto+'; HttpOnly']);
            response.redirect('/proyectos');
        }).catch(err => console.log(err));

}

exports.postBuscar= (request, response, next) => {
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
    Proyecto.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('ver_proyecto', { 
                Proyecto: rows,  
                titulo: 'Trabajo del proyecto',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProyectoModificar = (request, response, next) => {
    const id = request.params.proyecto_id;
    console.log("getModificar");
    Proyecto.fetchOne(id);
    console.log(id);
    Proyecto.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('modificar_proyecto', { 
                proyecto: rows,  
                titulo: 'Modificar Proyecto',
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
    console.log(request.cookies.ultimo_proyecto);

    Proyecto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('proyectos', { 
                lista_proyecto: rows, 
                titulo: 'Proyectos',
                //csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};
