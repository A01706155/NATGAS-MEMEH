// Sirve para evitar que la fecha no sea puesta al revés en las vistas
// registrar_proyecto y modificar_proyecto

document.getElementById("enviar").addEventListener('submit', (e) => {
    let fecha_de_inicio = document.getElementById("fecha_inicio").value;
    let fecha_de_finalizacion = document.getElementById("fecha_fin").value;
    if(fecha_de_inicio > fecha_de_finalizacion){
    alert('La fecha de finalización no puede ser anterior a la de inicio.')
    e.preventDefault();
    }  
});