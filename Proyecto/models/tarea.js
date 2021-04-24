const db = require('../util/database');

module.exports = class Tarea {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, id_fase) {
        this.nombre = nombre;
        this.id_fase = id_fase;
    }

    save() {
        return db.execute('INSERT INTO tarea (nombreTarea, idFase) VALUES (?,?)',
            [this.nombre, this.id_fase]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM tarea ORDER BY idFase');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM tarea WHERE idFase=?', [id]);
    }

    static fetchOneByTask(id) {
        return db.execute('SELECT * FROM tarea WHERE idTarea=?', [id]);
    }

    static fetchByFase(id) {
        return db.execute('SELECT * FROM tarea WHERE idFase=?', [id]);
    }

    static modify(nombreTarea, idFase) {
        return db.execute('UPDATE tarea SET nombreTarea=?  WHERE idFase=?',
        [nombreTarea, idFase]);
    }
}