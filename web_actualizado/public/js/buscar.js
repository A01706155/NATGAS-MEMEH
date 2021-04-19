function buscar() {
    const valor_busqueda = document.getElementById("buscar").value;
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    let data = {valor_busqueda: valor_busqueda};
    console.log(valor_busqueda);
    //función que manda la petición asíncrona
    fetch('/proyectos/buscar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'csrf-token': csrf,
            'Content-Type': 'application/json'
          },
    }).then(result => {
        return result.json(); //Regresa otra promesa
    }).then(data => {
        //Modificamos el DOM de nuestra página de acuerdo a los datos de la segunda promesa
        console.log(data);
        let html = '';
        for (let proyecto of data) {
          html += '<div class="col s12 m6 l4"> <div class="card small grey darken-4"> <div class="card-content white-text"> <span class="card-title">' + proyecto.nombreProyecto + '</span> <p>' + proyecto.descripcion + ' </p> </div> <div class="center card-action"> <a class="waves-effect waves-light btn teal darken-2" href="/proyectos/' + proyecto.idProyecto + '"><i class="material-icons left">visibility</i>Ver proyecto</a> </div> </div> </div>';
        }

        document.getElementById("resultados").innerHTML = html;

    }).catch(err => {
        console.error(err);
    });
  }