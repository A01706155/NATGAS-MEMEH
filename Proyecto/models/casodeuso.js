const db = require('../util/database');

module.exports = class Historiausuario {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(ap,yo_como, quiero, para,comentario, idProyecto) {
        this.idProyecto = idProyecto;
        this.yo_como = yo_como;
        this.quiero = quiero;
        this.para = para;
        this.ap = ap;
        this.comentario = comentario;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO historiausuario (AP, yo_como, quiero, para, comentario, idProyecto) VALUES (?,?,?,?,?,?)',
            [this.ap, this.yo_como, this.quiero, this.para, this.comentario, this.idProyecto]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM historiausuario');
    }

    static fetchAllTables() {
        return db.execute('SELECT * FROM historiausuario, reporte, tarea, estado');
    }
    
    static fetchOne(id) {
        return db.execute('SELECT * FROM historiausuario WHERE idHistoria=?', [id]);
    }

    static fetchByProject(idProyecto) {
        return db.execute('SELECT * FROM historiausuario WHERE idProyecto=?', [idProyecto]);
    }

   /* static fetchByName(idIteracion) {
        return db.execute("SELECT * FROM `iteracion` WHERE `idIteracion` LIKE ? ", ['%'+idIteracion+'%']);
    }*/
    static EliminarConexionHistoriaReporte(idHistoria) {
        return db.execute('DELETE FROM reporte WHERE idHistoria=?', [idHistoria]);
    }

    static EliminarHistoria(idHistoria){
        return db.execute('DELETE FROM historiausuario WHERE idHistoria=?', [idHistoria]);
    }


    static modify(ap, yo_como, quiero, para, comentario, idHistoria) {
        return db.execute('UPDATE historiausuario SET AP=?, yo_como=?, quiero=?, para=?, comentario=? WHERE idHistoria=?',
        [ap, yo_como, quiero, para, comentario, idHistoria]);
    }
}