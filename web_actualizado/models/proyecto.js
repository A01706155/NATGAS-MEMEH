//const proyectos = ["Proyecto Prueba 1"];

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
        return db.execute('INSERT INTO proyectos (nombreProyecto, descripcion,fecha_inicio, fecha_fin) VALUES (?,?,?,?)',
            [this.nombreProyecto, this.descripcion, this.fecha_inicio, this.fecha_fin]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM proyectos');
    }

    static fetchNombreProyecto() {
        return db.execute("SELECT * FROM `proyectos` WHERE `nombreProyecto` LIKE ? ", ['%'+nombre+'%']);
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM proyectos WHERE idProyecto=?', [id]);
    }


}