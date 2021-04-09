
const Proyecto = require('../models/proyecto');

exports.getRegistrarProyecto = (request, response, next) => {
    response.render('registrar_proyecto', {
        titulo: 'Registrar proyecto',
    });
};

exports.postRegistrarProyecto = (request, response, next) => {
    console.log(request.body.nombreProyecto);
    const nuevo_proyecto = new Proyecto(request.body.nombreProyecto);
    nuevo_proyecto.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultimo_proyecto='+nuevo_proyecto.nombreProyecto+'; HttpOnly']);
            response.redirect('/proyectos');
        }).catch(err => console.log(err));

}

exports.getContenido = (request, response, next) => {
    response.render('contenido', {
        titulo: 'Registrar proyecto',
    });
};

/*exports.getProyecto = (request, response, next) => {
    const proyectos = Proyecto.fetchAll();
    response.render('proyectos', { 
        lista_proyecto: proyectos, 
        titulo: 'Proyecto' 
    });
};*/

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
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};
