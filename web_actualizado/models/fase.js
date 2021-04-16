const db = require('../util/database');

module.exports = class Fase {

    //Constructor de la clase. Sirve para crear un nuevo objeto y en él se definen las propiedades del modelo
    constructor(nombreProyecto,descripcion,fecha_inicio,fecha_fin) {
        this.numFase = numFase;
        this.nombreFase = nombreFase;
        this.idProyecto = idProyecto;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO fases (numFase, nombreFase, idProyecto) VALUES (?,?,?)',
            [this.nombreProyecto, this.nombreFase, this.idProyecto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM fases');
    }

    static fetchByProject(id) {
        return db.execute('SELECT * FROM fases WHERE idProyecto=?', [id]);
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM fases WHERE idFase=?', [id]);
    }
}
