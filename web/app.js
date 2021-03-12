

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const csrf = require('csurf');
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
    secret: 'ingreso', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(csrfProtection);

app.use((request, response, next) => {
    console.log('Middleware!');
    next();
});

app.get('/', (request, response, next) => {
  response.send('<h1><ul>Laboratorio 11</ul></h1>');
    //response.sendFile(path.join(__dirname, 'index.html'));
});

app.use((request, response, next) => {
    //response.statusCode = 404;
    response.status(404);
    response.send('<h1>Page not found :(</h1>');
});

app.listen(5000);