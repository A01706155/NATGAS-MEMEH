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
          html +=
          '<div class="col s12 m6 l3">' +
              '<div class="card medium grey darken-4">' +
                  
                  '<div class="card-image waves-effect waves-block waves-light">'+
                      '<img class="activator" src="/images/proyecto.jpg">'+
                  '</div>'+
                  
                  '<div class="card-content">'+
                  '<span class="card-title activator grey-text text-lighten-3">Proyecto:'+ proyecto.nombreProyecto +    
                      
                    '<div class="center card-action">'+
                      '<!-- Dropdown Trigger -->'+
                      '<a class="dropdown-trigger btn" data-target="'+ proyecto.idProyecto +'"style="width: 80%;">Acciones</a>'+
                    
                      '<!-- Dropdown Structure -->'+
                      '<ul id= "'+ proyecto.idProyecto + '"class="dropdown-content black">'+
                          '<li><a class="white-text" href="/proyectos/modificar-proyecto/'+ proyecto.idProyecto +'"><i class="material-icons">edit</i>Editar proyecto</a></li>'+
                          '<li><a class="white-text" href="/fases/'+ proyecto.idProyecto +'"><i class="material-icons">grid_view</i>Fases y tareas</a></li>'+
                          '<li><a class="white-text" href="/proyectos/casodeuso/'+ proyecto.idProyecto +'"><i class="material-icons">border_all</i>Historia de Usuario</a></li>'  +
                          '<li class="divider" tabindex="-1"></li>'+
                      
                          '<li>'+
                            '<form action="/proyectos/eliminarProyecto" method="POST" id="eliminar_'+ proyecto.idProyecto +'">'+
                              '<input type="hidden" name="_csrf" value="<%= csrfToken %>">'+
                              '<input type="hidden" name="idProyecto" value="'+ proyecto.idProyecto +'">'+
                              '<button class="transparent" style="border-color: rgba(255, 255, 255, 0);"><li><a type="submit" name="add" class="waves-effect waves-light red"><i class="material-icons left">delete</i>Borrar</a></li></button>'+
                              '<script>' +
                                'document.getElementById("eliminar_'+ proyecto.idProyecto +'").addEventListener("submit", (e) =>  {'+
                                  'let confirmacion = confirm("¿Estás seguro de eliminar el Proyecto?");'+
                                  'if(!confirmacion) {'+
                                    'e.preventDefault();'  +
                                '} '+
                               '});'+
                              '</script>'+
                            '</form>'  +
                          '</li>'+
                    
                          '</ul>'+
                        
                    '</div>'+
                  '</div>'+

                  '<div class="card-reveal">'+
                      '<span class="card-title grey-text text-darken-4">Proyecto: '+ proyecto.nombreProyecto +'<i class="material-icons right">close</i></span>'+
                      '<br>'+
                      '<strong>Proyecto:</strong> '+ proyecto.nombreProyecto +'<br><br>'+
                      '<strong>Descripcion:</strong> '+ proyecto.descripcion +'<br><br>'+
                      '<strong>Fecha de inicio:</strong> '+ proyecto.fechaPlaneada +'<br><br>'+
                      '<strong>Fecha de finalización:</strong> '+ proyecto.fechaEntrega +'<br><br>'+
                  '</div>'+

              '</div>'+
          '</div>';
        }

        document.getElementById("resultados").innerHTML = html;

    }).catch(err => {
        console.error(err);
    });
  }