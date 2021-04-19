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
          html += '<div class="col s12 m4 l3">' +
                    '<div class="card small grey darken-4">' +
                        '<div class="card-image waves-effect waves-block waves-light">' +
                          '<img class="activator" src="/images/background2.jpg">' +
                        '</div>' +
                        '<div class="card-content">' +
                          '<span class="card-title activator grey-text text-lighten-3">' + proyecto.nombreProyecto +       
                            '<i class="material-icons right">arrow_drop_down</i>' +              
                          '<p><a href="/proyectos/' + proyecto.idProyecto +'" ">Ver proyecto</a></p>' +
                        '</div>' +
                        '<div class="card-reveal grey darken-4 grey-text text-lighten-3">' +
                          '<span class="card-title">' + proyecto.nombreProyecto + '<i class="material-icons right">close</i></span>' +
                          '<p class="">Descripción:' + proyecto.descripcion + '</p>' +
                        '</div>' +
                      '</div>' +
                  '</div>';
        }
        document.getElementById("resultados").innerHTML = html;

    }).catch(err => {
        console.error(err);
    });
  }