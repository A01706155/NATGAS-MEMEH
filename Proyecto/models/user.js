const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, username, password, rol) {
        this.nombre = nombre;
        this.username = username;
        this.password = password;
        this.rol = rol;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_encriptado) => {
                return db.execute(
                    'INSERT INTO empleado (usuario, nombreEmpleado, contrasena, rol) VALUES (?, ?, ?, ?)',
                    [this.username, this.nombre, password_encriptado, this.rol]
                );
            }).catch(err => console.log(err));  
    }

    static fetchOne(username) {
        return db.execute('SELECT * FROM empleado WHERE usuario=?', [username]);
    }

    static fetchTwo(idEmpleado) {
        return db.execute('SELECT * FROM empleado WHERE idEmpleado=?', [idEmpleado]);
    }


    static postEliminarEmpleados(idEmpleado){
        return db.execute('DELETE FROM empleado WHERE idEmpleado=?', [idEmpleado]);
    }
    

    static fetchAll() {
        return db.execute('SELECT * FROM empleado');
    }

    static modify(username, nombre, rol, idEmpleado ) {
        return db.execute('UPDATE empleado SET usuario=?, nombreEmpleado=?, rol=? WHERE idEmpleado=?',
        [username, nombre, rol, idEmpleado]);
    }

    static modifyPassword(password, idEmpleado) {
        return bcrypt.hash(password, 12)
            .then((password_encriptado) => {
                return db.execute('UPDATE empleado SET contrasena=? WHERE idEmpleado=?',
                    [password_encriptado, idEmpleado]
                );
            }).catch(err => console.log(err)); 
        
    }
}