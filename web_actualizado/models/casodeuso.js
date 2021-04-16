const db = require('../util/database');


module.exports = class CasoDeUso {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idCasoUso, nombre, descripcion, idProyecto, dificultad, iteracion) {
        this.idCasoUso = idCasoUso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.idProyecto = idProyecto;
        this.dificultad = dificultad;
        this.iteracion = iteracion;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        console.log( this.nombre, this.descripcion, this.idProyecto, this.dificultad, 'NULL', 'NULL', this.iteracion);
        return db.execute('INSERT INTO usecase ( nombre, descripcion, idProyecto, dificultad, tiempoMax, tiempoMin, iteracion) VALUES (?, ?, ?, ?, ?, ?, ?)',
                          [ this.nombre, this.descripcion, this.idProyecto, this.dificultad, 'NULL', 'NULL', this.iteracion]
        );
    }

    //cu 10
    actualizar() {
        return db.execute(
            "UPDATE  usecase SET nombre=?, descripcion=?, idProyecto =?, dificultad=?, iteracion=? WHERE idCasoUso =? ",
            [ this.nombre, this.descripcion, this.idProyecto, this.dificultad, this.iteracion, this.idCasoUso ]
            );
    }
 
    

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM  usecase');
    }
    
    static fetchOne(idCasoUso) {
        return db.execute('SELECT * FROM  usecase WHERE idCasoUso=?', [idCasoUso]);
    }

    static fetchByProject(idProyecto) {
        return db.execute('SELECT * FROM  usecase WHERE idProyecto=? ORDER BY iteracion ASC', [idProyecto]);
    }
    
    static EliminarCasoDeUso(idCasoDeUso){
        return db.execute('DELETE FROM  usecase WHERE idCasoUso=?', [idCasoDeUso]);
    }        


}