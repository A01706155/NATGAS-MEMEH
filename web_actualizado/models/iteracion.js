const db = require('../util/database');

module.exports = class Iteracion {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(descripcion,fechaPlaneada,fechaEntrega, estadoIteracion) {
        this.descripcion = descripcion;
        this.fechaPlaneada = fechaPlaneada;
        this.fechaEntrega = fechaEntrega;
        this.estadoIteracion = estadoIteracion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO iteracion (descripcion, fechaPlaneada, fechaEntrega, estadoIteracion) VALUES (?,?,?,?)',
            [this.descripcion, this.fechaPlaneada, this.fechaEntrega, this.estadoIteracion]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM iteracion');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM iteracion WHERE idIteracion=?', [id]);
    }

   /* static fetchByName(idIteracion) {
        return db.execute("SELECT * FROM `iteracion` WHERE `idIteracion` LIKE ? ", ['%'+idIteracion+'%']);
    }

    static modify(descripcion, fechaPlaneada, fechaEntrega, idProyecto) {
        return db.execute('UPDATE iteracion SET descripcion=?, fechaPlaneada=?, fechaEntrega=? WHERE idProyecto=?',
        [ descripcion, fechaPlaneada, fechaEntrega, idProyecto]);
    }*/
}