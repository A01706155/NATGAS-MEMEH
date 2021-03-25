const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

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

app.use('/users', rutasUsers);


app.get('/inicio', (request, response, next) => {
    response.render('inicio', { 
    titulo: 'Inicio',
    isLoggedIn: request.session.isLoggedIn === true ? true : false 
    });
});

app.use((request, response, next) => {
    response.statusCode = 404;
    response.send('Page not found :('); //Manda la respuesta
});

app.listen(3000);