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

    static modify(nombre, username, password, rol,idEmpleado ) {
        return db.execute('UPDATE empleado SET usuario=?, nombreEmpleado=?, contrasena=?, rol=? WHERE idEmplaedo=?',
        [nombre, username, password, rol, idEmpleado]);
    }
}