const db = require('../util/database');

module.exports = class Tarea {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, id_fase) {
        this.nombre = nombre;
        this.id_fase = id_fase;
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

    static fetchOneByFase(id) {
        return db.execute('SELECT * FROM fase WHERE idFase=?', [id]);
    }

    static modify(nombreTarea, idFase) {
        return db.execute('UPDATE fase SET nombreFase=?  WHERE idFase=?',
        [nombreFase, idFase]);
    }
}