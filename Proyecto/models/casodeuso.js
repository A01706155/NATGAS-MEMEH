const db = require('../util/database');

module.exports = class Casodeuso {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idIteracion, idAP, yo_como, quiero, para, comentario) {
        this.idIteracion = idIteracion;
        this.idAP = idAP;
        this.yo_como = yo_como;
        this.quiero = quiero;
        this.para = para;
        this.comentario = comentario;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO casos_uso (idIteracion, idAP, yo_como, quiero, para, comentario) VALUES (?,?,?,?,?,?)',
            [this.idIteracion, this.idAP, this.yo_como, this.quiero, this.para, this.comentario]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM casos_uso');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM casos_uso WHERE idCaso=?', [id]);
    }

    static fetchByIteracion(idIteracion) {
        return db.execute('SELECT * FROM casos_uso WHERE idIteracion=?', [idIteracion]);
    }

   /* static fetchByName(idIteracion) {
        return db.execute("SELECT * FROM `iteracion` WHERE `idIteracion` LIKE ? ", ['%'+idIteracion+'%']);
    }*/

    static EliminarCasodeuso(){
        return db.execute('DELETE FROM casos_uso WHERE idCaso=?', [this.idCaso]);
    }

     /*static modify(idProyecto, estadoIteracion, descripcion, fechaPlaneada, fechaEntrega, idIteracion) {
        return db.execute('UPDATE iteracion SET idProyecto=?, estadoIteracion=?, descripcion=?, fechaPlaneada=?, fechaEntrega=? WHERE idIteracion=?',
        [idProyecto, estadoIteracion, descripcion, fechaPlaneada, fechaEntrega, idIteracion]);
    }*/
}