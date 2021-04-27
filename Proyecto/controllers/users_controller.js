const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (request, response, next) => {

    response.render('login2', {
        user: request.session.usuario,
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
                console.log(rows[0].contrasena);
                console.log(request.body.password);
                console.log("bruh");
                bcrypt.compare(request.body.password, rows[0].contrasena)
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
        user: request.session.usuario,
        titulo: 'Registrar usuario',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postRegister = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.nombre, request.body.usuario, request.body.password, request.body.rol);
    nuevo_usuario.save()
        .then(() => {
            request.session.isLoggedIn = true;
            request.session.usuario = request.body.usuario;
            response.redirect('/');
        }).catch(err => console.log(err));

}