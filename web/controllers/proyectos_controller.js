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

    response.redirect('/');
};