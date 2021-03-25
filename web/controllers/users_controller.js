exports.getLogin = (request, response, next) => {
    response.render('login', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false,
        titulo: 'Login',
        error: request.session.error
    });
};

exports.postLogin = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.usuario = request.body.usuario;

    response.redirect('/');
};

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
       console.log('Logout');
        response.redirect('/');
    }); 
};