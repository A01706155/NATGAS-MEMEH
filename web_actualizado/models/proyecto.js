//const proyectos = ["Proyecto Prueba 1"];

const db = require('../util/database');

module.exports = class Proyecto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombreProyecto) {
        this.nombreProyecto = nombreProyecto;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO proyectos (nombreProyecto) VALUES (?)',
            [this.nombreProyecto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM proyectos');
    }

}