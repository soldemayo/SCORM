//////////////////////////////////////////////// READY!!!!!!!! ////////////////////////////////////////////////	

$(document).ready(function () {	
	console.log("CARGADO M3");
	
		 $('[data-popover="popover1"]').click(function(){
			 //$('.popoverCont').fadeOut();
			 $('.popover1').fadeIn("fast");
		 });
		
		$('.cierraPopover').click(function(){
			 $(this).parent('.popoverCont').fadeOut("fast");
		 })
		
		$('.m3p1a1').click(function(){
			 $('.cont1').addClass("activo")
		 })
		$('.m3p1a2').click(function(){
			 $('.cont2').addClass("activo")
		 })
	


		
	
		function aCont(dato){
			if(!$(this).attr("data-cajaCont")){
				console.log("TIENE EL ATRIBUTO DATA-CAJACONT"+$data);
				$div = ".cont"+dato;
				$(".contenidoDashRojo").addClass("d-none");
				$(".bordeDashRojo > .indicacionPicha").addClass("d-none").removeClass("d-flex")
				$($div).removeClass("d-none");
			}
		}
	
	$('*[data-cajaCont').click(function(){
		$data = parseInt($(this).data("cajacont"))
		aCont($data);
	});
		
	$(".modal").modal({
		backdrop:false,
		show: false
	})
	
	if($(".contNivel2").hasClass("true")){
	   	$('*[data-toggle="modal"]').click(function(){
		$('<div class="modal-backdrop"></div>').appendTo('#contenedor');
		$(".modal-backdrop").fadeIn();
		
		if(!$(this).hasClass("btnSalir") && !$(this).hasClass("btnInfo")){
			var $file = 'cont/m'+ ($temaActual-2) +'.html';
		var $target = $(this).data("target");
		var $titulo = $(this).data("titulo");
		var $contPop = $(this).data("contpop");
			console.log("TARGET, TITULO, CONTPOP=====" + $target + '----'+ $titulo + '----'+ $contPop)
		$($target).find('.modal-body').empty();
		$($target).find('.modal-title').text($titulo);
		console.log("DATA_ESTA???========" + $contPop);
		if($contPop == undefined){
			$($target).find('.modal-body').load($file + ' #popContenido');
		   }else{
			$($target).find('.modal-body').load($file + ' #popContenido' + $contPop);
		   }
		}
	});
	   }
	
		$('.obligatorio').click(function(){
		$(this).removeClass("obligatorio").addClass("visto");
		if($(this).data("toggle") == "modal"){
			console.log("BOTON ABRE UN POP")
		}else{
			consultarObligatorios();
		}
		
	});	
	
	
	

});
