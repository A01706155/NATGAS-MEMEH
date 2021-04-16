const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (request, response, next) => {
    console.log("j");

    response.render('login2', {
        titulo: 'Iniciar sesión',
        csrfToken: request.csrfToken(),
        //error: request.session.error === true ? true : false,
        error: request.session.error,
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};
 
exports.postLogin = (request, response, next) => {
    request.session.error = "";
    const username = request.body.usuario;
    console.log(username);
    Usuario.fetchOne(username)
        .then(([rows, fieldData]) => {
            if (rows.length < 1) {
                request.session.error = "El usuario y/o contraseña no coinciden";
                response.redirect('/users/login');
            } else {
                bcrypt.compare(request.body.password, rows[0].password)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.usuario = request.body.usuario;
                            //request.session.rol = rows[0].rol;
                            return request.session.save(err => {
                                response.redirect('/proyectos');
                            });
                        }
                        request.session.error = "El usuario y/o contraseña no coinciden";
                        response.redirect('/users/login');
                    }).catch(err => {
                        request.session.error = "El usuario y/o contraseña no coinciden";
                        response.redirect('/users/login');
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/')
    });
};

exports.getRegister = (request, response, next) => {
    response.render('register', {
        csrfToken: request.csrfToken(),
        titulo: 'Registrar usuario',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegister = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.nombre, request.body.usuario, request.body.password);
    nuevo_usuario.save()
        .then(() => {
            request.session.isLoggedIn = true;
            request.session.usuario = request.body.usuario;
            response.redirect('/');
        }).catch(err => console.log(err));

}