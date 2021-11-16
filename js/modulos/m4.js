//////////////////////////////////////////////// READY!!!!!!!! ////////////////////////////////////////////////	

$(document).ready(function () {	
	console.log("CARGADO M4");
	
		
	$(".modal").modal({
		backdrop:false,
		show: false
	})
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
	
		$('.obligatorio').click(function(){
		$(this).removeClass("obligatorio").addClass("visto");
		if($(this).data("toggle") == "modal"){
			console.log("BOTON ABRE UN POP")
		}else{
			consultarObligatorios();
		}
		
	});	
	
		$('.elementoHover').hover(function(){
		$(this).removeClass("obligatorio").addClass("visto");
			consultarObligatorios();
		});	
	
	if(isMobile.any() || navigator.maxTouchPoints == 5){
		$('.row').find(".elementoHover").removeClass("pointerNo");
	}else{
		$('.elementoHoverLast').one("webkitAnimationEnd animationend", function(){
			console.log("TERMINA ANIMACION ELEMENTOS HOVER")
			$('.row').find(".elementoHover").removeClass("pointerNo");
		})
	}
		
	
	

});
