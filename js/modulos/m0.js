//////////////////////////////////////////////// READY!!!!!!!! ////////////////////////////////////////////////	

$(document).ready(function () {
	console.log("CARGADO M0");
	
			$('.nav-link').click(function(){
			 $('.tab-content').find('.indicacionPicha').hide();;
		 })
	
			$('.obligatorio').click(function(){
		$(this).removeClass("obligatorio").addClass("visto");
		if($(this).data("toggle") == "modal"){
			$('<div class="modal-backdrop"></div>').appendTo('#contenedor');
			$(".modal-backdrop").fadeIn();
			console.log("BOTON ABRE UN POP")
		}else{
			consultarObligatorios();
		}
		
	});	
});
