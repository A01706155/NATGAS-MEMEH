const db = require('../util/database');

module.exports = class Fase {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, id_proyecto) {
        this.nombre = nombre;
    }

    save() {
        return db.execute('INSERT INTO fase (nombreFase) VALUES (?)',
            [this.nombre]
        );
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM fase WHERE idProyecto=?', [id]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM fase');
    }

    static fetchOneByFase(id) {
        return db.execute('SELECT * FROM fase WHERE idFase=?', [id]);
    }

    static EliminarConexionFaseTareas(idFase) {
        return db.execute('DELETE FROM tarea WHERE idFase=?', [idFase]);
    }

    static EliminarFase(idFase) {
        return db.execute('DELETE FROM fase WHERE idFase=?', [idFase]);
    }

}