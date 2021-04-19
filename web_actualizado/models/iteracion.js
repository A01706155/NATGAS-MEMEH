const db = require('../util/database');

module.exports = class Iteracion {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(descripcion,fecha_inicio,fecha_fin, estadoIteracion) {
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.estadoIteracion = estadoIteracion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO iteracion (nombreProyecto, descripcion,fechaPlaneada, fechaEntrega, estadoIteracion) VALUES (?,?,?,?,?)',
            [this.nombreProyecto, this.descripcion, this.fecha_inicio, this.fecha_fin, this.estadoIteracion]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM iteracion');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM iteracion WHERE idProyecto=?', [id]);
    }

    static fetchByName(nombreProyecto) {
        return db.execute("SELECT * FROM `proyiteracionecto` WHERE `nombreProyecto` LIKE ? ", ['%'+nombreProyecto+'%']);
    }

    static modify(nombreProyecto, descripcion, fecha_inicio, fecha_fin, idProyecto) {
        return db.execute('UPDATE iteracion SET nombreProyecto=?, descripcion=?, fechaPlaneada=?, fechaEntrega=? WHERE idProyecto=?',
        [nombreProyecto, descripcion, fecha_inicio, fecha_fin, idProyecto]);
    }
}