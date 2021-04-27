const path = require('path');
const fs = require('fs');

exports.get = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..','public', 'login.html'));
}

exports.post = (request, response, next) => {
    console.log(request.body);
    fs.writeFileSync("LoginData", `User:${request.body.uid}, Psw:${request.body.password}`);
    response.redirect('/home');
}