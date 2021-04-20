const db = require('../util/database');

module.exports = class User {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, id_proyecto) {
        this.nombre = nombre;
        this.id_proyecto = id_proyecto;
    }

    save() {
        return db.execute('INSERT INTO fase (nombreFase, idProyecto) VALUES (?,?)',
            [this.nombre, this.id_proyecto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM fase');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM fase WHERE idProyecto=?', [id]);
    }

    static modify(nombreFase, idFase) {
        return db.execute('UPDATE fase SET nombreFase=?,  WHERE idFase=?',
        [nombreFase, idFase]);
    }
}