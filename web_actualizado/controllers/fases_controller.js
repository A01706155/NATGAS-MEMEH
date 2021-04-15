const Fase = require('../models/fase');

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

exports.get = (request, response, next) => {
    console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);
    
    //Con cookie-parser
    console.log(request.cookies);

    Proyecto.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('proyectos', { 
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