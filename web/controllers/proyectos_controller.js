exports.getRegistrarProyecto = (request, response, next) => {
    response.render('registrar_proyecto', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false,
        titulo: 'Registrar proyecto',
        error: request.session.error
    });
};

exports.postRegistrarProyecto = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.usuario = request.body.usuario;

    response.redirect('/proyectos');
};

exports.getProyecto = (request, response, next) => {
    response.render('proyectos', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false,
        titulo: 'Proyectos',
        error: request.session.error
    });
};