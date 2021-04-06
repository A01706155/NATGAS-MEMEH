// Mensaje del servidor iniciado
console.log('¡Servidor iniciado!');

// Importación de frameworks
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Sirve para establecer las carpetas de view engine y views
app.set('view engine', 'ejs');
app.set('views', 'views');

const rutasProyectos = require('./routes/proyectos');
const rutasUsers = require('./routes/users');

//const rutasPersonajes = require('./routes/personajes');

//Middleware
//Para acceder fácilmente a los datos de las formas
app.use(bodyParser.urlencoded({extended: false}));

//Para acceder a los valores de las cookies
app.use(cookieParser());

//Para trabajar con sesiones
app.use(session({
    secret: 'grgrfgrgeddgaagsres', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

// Página de usuarios
app.use('/proyectos', rutasProyectos);
app.use('/users', rutasUsers);

// Página de login
app.get('/', (request, response, next) => {
    console.log('Bienvenido');
    console.log(request.session);
    response.render('login.ejs', {
        titulo: 'Login',
    }); 
});

// Página de proyectos
//app.get('/proyectos', (request, response, next) => {
//    console.log('Bienvenido');
//    response.render('proyectos', {
//        titulo: 'Proyectos',
//    }); 
//});




// Página de inicio
app.get('/inicio', (request, response, next) => {
    response.render('inicio', { 
    titulo: 'Inicio',
    isLoggedIn: request.session.isLoggedIn === true ? true : false 
    });
});

// Página de 404
app.use((request, response, next) => {
    response.statusCode = 404;
    response.send('Page not found :('); //Manda la respuesta
});

app.listen(3000);