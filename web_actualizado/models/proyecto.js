const db = require('../util/database');

module.exports = class Proyecto {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombreProyecto,descripcion,fecha_inicio,fecha_fin, estadoProyecto) {
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.estadoProyecto = estadoProyecto;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO proyecto (nombreProyecto, descripcion,fechaPlaneada, fechaEntrega, estadoProyecto) VALUES (?,?,?,?,?)',
            [this.nombreProyecto, this.descripcion, this.fecha_inicio, this.fecha_fin, this.estadoProyecto]
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
        return db.execute('UPDATE proyecto SET nombreProyecto=?, descripcion=?, fechaPlaneada=?, fechaEntrega=?, estadoProyecto=? WHERE idProyecto=?',
        [nombreProyecto, descripcion, fecha_inicio, fecha_fin, estado, idProyecto]);
    }

    static delete(idProyecto) {
        return db.execute('DELETE FROM proyecto WHERE idProyecto=? ', [idProyecto]);
    }
}