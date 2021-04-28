for reportes of Reporte{
	for historias of historiausuario{
		if(reportes.idHistoria == historias.idHistoria){
		<%= historias.quiero %> -	
		}
	}
	for tareas of Tarea{
		if(reportes.idTarea == tareas.idTarea){
			for fases of fase{
				if(tareas.idFase == fases.idFase){
				<%= tareas.nombreTarea %> 
				(<%= fases.nombreFase %>)
				}
			}
		}
	}
	for estados of estado{
		if(reportes.idEstado == estados.idEstado){
			<%= fases.nombreNombreFase %>
		}
	}
}
	