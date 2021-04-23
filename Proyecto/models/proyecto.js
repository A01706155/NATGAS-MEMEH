const db = require('../util/database');

module.exports = class Proyecto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombreProyecto,descripcion,fecha_inicio,fecha_fin) {
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO proyecto (nombreProyecto, descripcion,fechaPlaneada, fechaEntrega) VALUES (?,?,?,?)',
            [this.nombreProyecto, this.descripcion, this.fecha_inicio, this.fecha_fin]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM proyecto');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM proyecto WHERE idProyecto=?', [id]);
    }

    static fetchByName(nombreProyecto) {
        return db.execute("SELECT * FROM `proyecto` WHERE `nombreProyecto` LIKE ? ", ['%'+nombreProyecto+'%']);
    }

    static modify(nombreProyecto, descripcion, fecha_inicio, fecha_fin, estado, idProyecto) {
        return db.execute('UPDATE proyecto SET nombreProyecto=?, descripcion=?, fechaPlaneada=?, fechaEntrega=? WHERE idProyecto=?',
        [nombreProyecto, descripcion, fecha_inicio, fecha_fin, idProyecto]);
    }
}