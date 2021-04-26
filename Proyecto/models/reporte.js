const db = require('../util/database');

module.exports = class Reporte {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idTarea,idHistoria, idEstado) {
        this.idTarea = idTarea;
        this.idHistoria = idHistoria;
        this.idEstado = idEstado;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO reporte (idTarea, idHistoria, idEstado) VALUES (?,?,1)',
            [this.idTarea, this.idHistoria]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM reporte');
    }

    static fetchByProject(idHistoria) {
        return db.execute('SELECT * FROM reporte WHERE idHistoria=?', [idHistoria]);
    }
}