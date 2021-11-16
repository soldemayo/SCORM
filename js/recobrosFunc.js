//si va a ser scorm lo dejamos en 1, sino 0
var $scorm = 1;
// 1 si queremos deshabilitar el boton derecho sino 0
var $contexMenu = 1;
var $finalizado = false;
var $finalizadoVisto = false;
var $avanceCerrado = 0;
var $totalPaginas = undefined;
var $myCarousel = $(".carousel")
var $this = $(this);
var $btnSalir = $(".btnSalir");
var $btnAyuda = $(".btnAyuda");
var $dataTemaBG = $(".bg")
var $contBody = $(".contBody")
var $contenidoCentral = $(".contenidoCentral")
var $contNivel2 = $(".contNivel2")
var $cerrarNivel2 = $(".contNivel2 .cerrar")
var $inicio = $(".inicio");
var $ayuda = $(".ayuda");
var $textModulo = $(".txtActivo")
var $nModulo = $(".numM")
var $tituloModulo = $(".tituloM")
var $inicioComenzar = $(".inicio .btnComenzar");
var $ayudaComenzar = $(".ayuda .btnComenzar");
var $volverLocation = $(".inicio .btnVolverLocation");
var $menu = $("#colMenu ul");
var $btnPils = $(".btnPils");
var $btnNivel2 = $('[data-pop="true"]');
var $btnInfograf = $(".btnInfografia");
var $btnReto = $(".btnReto");
var $btnInfo = $(".btnInfo");
var $btnPrev=$(".carousel-control-prev");
var $btnNext=$(".carousel-control-next");
var $temaActual = null;
var $pagActual = null;
var $modActual = null;
var $modActualPill = null;
var $moduloData = null;
var $dataValor;
var $indicadores = $(".indicadores");
var $indicadorLi = $(".indicadores li");
var contador = 0;
var porcentaje = 0;
var $modulosArray = ["trailer", "Introduction", "Structure and organization", "Processes", "Procedure", "Monitoring and supervision", "Risk control"];

var $lessonStatus = "";
var $dataRecuperada
var $lessonLocation = 0;
var $animadosArraySlide = [];
var $vistosArray = [];
var $menuArray = [];
var $infoAdicionalVisto = []
var $MtrailerArray = [];
var $MintroArray = [];
var $MintroArrayPill = [];
var $M1Array = [];
var $M1ArrayPill = [];
var $M2Array = [];
var $M2ArrayPill = [];
var $M3Array = [];
var $M3ArrayPill = [];
var $M4Array = [];
var $M4ArrayPill = [];
var $M5Array = [];
var $M5ArrayPill = [];
var $CursoData = {}
$CursoData.Mvistos = $vistosArray;
$CursoData.AdicVistos = $infoAdicionalVisto;
$CursoData.Mi = {};
$CursoData.Mi.m = $MintroArray;
$CursoData.Mi.pill = $MintroArrayPill;
$CursoData.M1 = {};
$CursoData.M1.m = $M1Array;
$CursoData.M1.pill = $M1ArrayPill;
$CursoData.M2 = {};
$CursoData.M2.m = $M2Array;
$CursoData.M2.pill = $M2ArrayPill;
$CursoData.M3 = {};
$CursoData.M3.m = $M3Array;
$CursoData.M3.pill = $M3ArrayPill;
$CursoData.M4 = {};
$CursoData.M4.m = $M4Array;
$CursoData.M4.pill = $M4ArrayPill;
$CursoData.M5 = {};
$CursoData.M5.m = $M5Array;
$CursoData.M5.pill = $M5ArrayPill;



    //////////////////////////////////////////////// COMUNICACION SCORM ////////////////////////////////////////////////
	function $ejecutaScorm(){
		/*if($avanceCerrado == 0){
			$(".indicadores li").addClass("open");
		}*/
		
		//inicializamos scorm y tiempo
		inicializaSCORM();
		if($scorm != 0){
		startTimer();
		console.log("$dataRecuperadaFUERA======="+JSON.stringify($dataRecuperada));
			
		//recuperaos la data (scoFunc.js) y sino inicializamos los valores en el else
		$dataRecuperada = recuperaLMS();
		if($dataRecuperada != null){
			//$(".ayuda").hide();
			//$(".inicio").removeClass("d-none");
			//$(".esInicio").hide();
			   $(".spinner-box").delay(2000).fadeOut("slow", function(){
				   //$(".esInicio").fadeIn();
				   //$(".inicio .btnComenzar").fadeIn();
				   $(".inicio").fadeOut();
			   });
			//$lessonLocationR = doGetValue('cmi.core.lesson_location');
			//$lessonLocation = parseInt($lessonLocationR);
			//$pagActual = $lessonLocation;
			$temaActualLMS = doGetValue('cmi.core.lesson_location');
			$temaActual = parseInt($temaActualLMS);
			porcentajeLMS = doGetValue('cmi.core.score.raw');
			porcentaje = parseInt(porcentajeLMS)
			$lessonStatus = doGetValue('cmi.core.lesson_status');
			$vistosArray = $dataRecuperada.Mvistos;
			$infoAdicionalVisto = $dataRecuperada.AdicVistos;
			$MintroArray = $dataRecuperada.Mi.m
			$MintroArrayPill = $dataRecuperada.Mi.pill
			$M1Array = $dataRecuperada.M1.m
			$M1ArrayPill = $dataRecuperada.M1.pill
			$M2Array = $dataRecuperada.M2.m
			$M2ArrayPill = $dataRecuperada.M2.pill
			$M3Array = $dataRecuperada.M3.m
			$M3ArrayPill = $dataRecuperada.M3.pill
			$M4Array = $dataRecuperada.M4.m
			$M4ArrayPill = $dataRecuperada.M4.pill
			$M5Array = $dataRecuperada.M5.m
			$M5ArrayPill = $dataRecuperada.M5.pill
			$CursoData.Mvistos = $vistosArray;
			$CursoData.AdicVistos = $infoAdicionalVisto;
			$CursoData.Mi.m = $MintroArray;
			$CursoData.Mi.pill = $MintroArrayPill;
			$CursoData.M1.m = $M1Array;
			$CursoData.M1.pill = $M1ArrayPill;
			$CursoData.M2.m = $M2Array;
			$CursoData.M2.pill = $M2ArrayPill;
			$CursoData.M3.m = $M3Array;
			$CursoData.M3.pill = $M3ArrayPill;
			$CursoData.M4.m = $M4Array;
			$CursoData.M4.pill = $M4ArrayPill;
			$CursoData.M5.m = $M5Array;
			$CursoData.M5.pill = $M5ArrayPill;
			console.log("$dataRECUPERADA======="+JSON.stringify($dataRecuperada))
			console.log("$lessonLocationRECUPERADA======="+$temaActual)
			console.log("porcentajeRECUPERADA======="+porcentaje)
			console.log("$lessonStatusRECUPERADA======="+$lessonStatus);
						
			$.each($CursoData.Mvistos, function () {
				$pos = this;
				console.log("vistosPOS========="+$pos)
				$("#indicadores li[data-index="+($pos+1)+"]").removeClass("disabled");
				$("#indicadores li[data-index="+($pos+1)+"]").find("i").removeClass("icon-lock").addClass("icon-unlock");
			});	
		
			//actualizaPorciento();
			colocaTema();
			/*$.each(sdata.modVistos, function () {
				$posM = this;
				console.log("modulosPOS========="+$posM)
				$(".indice li[data-lista="+$posM+"]").removeClass("inactivo").addClass("activo")
				$(".indice li[data-lista="+$posM+"] i").text("lock_open");
			});*/
				   
			
		   }else{
			   iniciaDatos();
			   $lessonLocation = 0;
			    $(".spinner-box").delay(2000).fadeOut("slow", function(){
				   //$(".esInicio").fadeIn();
				   //$(".inicio .btnComenzar").fadeIn();
				   $(".inicio").fadeOut();
			   });
			 /*  $(".spinner-box").delay(2000).fadeOut("slow", function(){
				   $(".imgAyuda").fadeIn("slow", function(){
					   $(".ayuda .btnComenzar").fadeIn("slow");
				   });
			   });*/
		   }
			
		
		$(window).on("beforeunload pagebeforehide pagehide", function () {
			terminarSesion();
		});
			
	}/// FIN IF $SCORM != 0 ///
	}
	



    //////////////////////////////////////////////// FIN COMUNICACION SCORM ////////////////////////////////////////////////	

    //////////////////////////////////////////////// REDIMENZIONAR ////////////////////////////////////////////////	

function redimensionaBTN(){
	var anchoSalir = $btnSalir.innerWidth();
	$btnSalir.height(anchoSalir);
	var anchoMenu = $("#colMenu ul li").innerWidth();
	$("#colMenu ul li").height(anchoMenu);
	$("#colMenu ul").css('margin-top',anchoSalir/2.25);
	console.log("anchoSalir======="+ anchoSalir);
	console.log("anchoMenu======="+ anchoMenu);
}

//redimensionaBTN();

/*window.onresize = function() {
    redimensionaBTN();
}*/

    //////////////////////////////////////////////// fin REDIMENZIONAR ////////////////////////////////////////////////	
//animacionesCSS de las pantallas generales
  function doAnimations(elems, close) {
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";
    $("*").animate({
      scrollTop: 0
    }, 500);
	 
    elems.each(function () {
		$cierra = close
		if($cierra == true){
			var $this = $(this),
				$animationType = $this.data("animation");
			$this.show();
		   }else{
			   var $this = $(this),
				$animationType = $this.data("animationclose");
		   }

		
		$this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
			if($cierra == false){
			   $this.hide();
			   }
      });
    });
  }
//animacionesCSS de las pildoras de cada tema
  function doAnimationsSlide(elemSlide) {
	  $animadosArraySlide.length = 0;
    $animadosPaginaSlide = elemSlide.length
	  console.log("ELEMENTOS A ANIMAR EN PAGINA >>>>>>>> " + $animadosPaginaSlide);
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";
	  
    elemSlide.each(function () {

      var $this = $(this),
		  $animationType = $this.data("animation");
		
		$this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
		
			if ($animadosArraySlide.indexOf($this) == -1) {
				$animadosArraySlide.push($this);
				console.log("ELEMENTOS ANIMADOS EN PAGINA >>>>>>>> " + $animadosArraySlide.length);

			}
			
			if ($animadosArraySlide.length == $animadosPaginaSlide) {
				$animadosArraySlide.length = 0;
				if($pagActual == $totalPaginas){
					paginaVista();
				   }else{
					   consultarObligatorios();
				   }
			}
		});
	});
  }


  //Initializo carousel
  $myCarousel.carousel({
	  touch: false
  });


// habilitamos o no las felchas de avance y retroceso de la pildora
function flechasonoff(){
	$paginaActuanlN = parseInt($pagActual);
	console.log("$ PAGINA NIVEL ACTUAL==========="+$paginaActuanlN)
		if(($pagActual)> 1){
			  $btnPrev.removeClass("disabled opacidad-0");
			  //$movilPrev.removeClass("prevMuestra");
		  }else{
			  $btnPrev.addClass("disabled opacidad-0");
			  //$movilPrev.addClass("prevMuestra");
		  }
	
		if(($paginaActuanlN) == $totalPaginas){
			  $btnNext.addClass("disabled opacidad-0");
			  //$movilNext.addClass("nextMuestra");
		  }else{
			  $btnNext.removeClass("disabled opacidad-0");
			  //$movilNext.removeClass("nextMuestra");
		  }
}

function avance(){
	$animadosArray.length = 0;
	$ultimoVistoArray = ($vistosArray.length);
	console.log("$ultimoVistoArray ========="+$ultimoVistoArray)
	//vemos si existe en el array del avance...sisi habilitamos el boton
	if($pagActual == $ultimoVistoArray){
		$btnNext.removeClass("btnInactivo animNext");
		//$movilNext.removeClass("nextInactivo");
		console.log("$pagActual == $ultimoVistoArray")
	}
	$nextPage = ($pagActual*1)+1;
	$nextPageString = $nextPage.toString();
	console.log("$nextPage ========="+$nextPage);
	console.log("$vistosArray ========="+$vistosArray);
	console.log("$nextPageindexOf ========="+$vistosArray.indexOf($nextPageString))
	// si existe en el array habilitamos el boton sino no
	if($vistosArray.indexOf($nextPageString) != -1){
		$btnNext.removeClass("btnInactivo");
		//$movilNext.removeClass("nextInactivo");
	}else{
		$btnNext.addClass("btnInactivo");
		//$movilNext.addClass("nextInactivo");
	}	
}

function retrocede(){
	$btnNext.removeClass("btnInactivo animNext").addClass("d-flex")
	//$movilNext.removeClass("nextInactivo");
}


////////// MODAL HIDE.BS //////////
	$('.modal2nivel').on('hide.bs.modal', function (e) {
		
		//cuando se cierra el modal ocultamos el fondo customizado
		$('.modal-backdrop').fadeOut("fast", function(){
			$('.modal-backdrop').remove();
			$('#infoadicional > #'+$modulo).hide();
		})

		consultarObligatorios();
	})

	$('#infoAditional, #salir').on('hide.bs.modal', function (e) {
		$('.modal-backdrop').fadeOut("fast", function(){
			$('.modal-backdrop').remove();
			$('#infoadicional > #'+$modulo).hide();
		})
		if($temaActual == 7){
			console.log("1___$FINALIZADO????????==== " + $finalizado);
		   if($finalizado == true && porcentaje == 100){
			   console.log("2____$FINALIZADO????????==== " + $finalizado);
			setTimeout(function(){
				popFinalizado();
			}, 300);
		   }
		}
		
	})

  //Animate captions in first slide on page load
  //doAnimations($firstAnimatingElems);
////////// POP 2 NIVEL //////////
function pop2Nivel(dato, cierra){
	console.log("$modulosArray[$temaActual]========="+$modulosArray[$temaActual-1]);
	$contNivel2.addClass("true");

	$btnNext.addClass("btnInactivo");
	colocoSubtitulo();
	if($contNivel2.hasClass("ayuda")){
		$contNivel2.find(".subTitulo").text("How do I navigate the course? ")
		$(".contBody").html('<img src="img/ayudaPop.svg" alt="" class="imgAyudaPop">');
		$(".imgAyudaPop").show();
		$contNivel2.find(".moduloN2").text("HELP");
	}else{
		$contNivel2.find(".moduloN2").text($modulosArray[$temaActual-1]);
	}
	
	/// animacion del pop
	doAnimations($contNivel2, cierra);
			
	$contNivel2.one("webkitAnimationEnd animationend", function(){
		var $firstAnimatingElems = $myCarousel
		.find(".carousel-item:first")
		.find("[data-animation ^= 'animated']");
	$myCarousel.find(".active").removeClass("d-none")
	doAnimationsSlide($firstAnimatingElems);
	})


	
	if(cierra == false){
		$contNivel2.removeClass("true");
		if($contNivel2.hasClass("ayuda")){
			$contNivel2.removeClass("ayuda")
		   }
		$myCarousel.carousel(0);
		$contBody.empty();
		$(".carousel-indicators").empty();
		$myCarousel.carousel('dispose');
		
		console.log("false");
		console.log("LARGO DEL MODULO ACTUAL COMPLETADO >>>>>> " + $modActual.length);
	   }
}


////////// POP 2 NIVEL ios//////////
function pop2Nivelios(dato, cierra){
	console.log("$modulosArray[$temaActual]========="+$modulosArray[$temaActual-1]);
	console.log("<<<<<<<<<FUNCION PO2 IOS>>>>>>>>>");
	$contNivel2.addClass("true");

	$btnNext.addClass("btnInactivo");
	colocoSubtitulo();
	if($contNivel2.hasClass("ayuda")){
		$contNivel2.find(".subTitulo").text("¿Cómo voy a navegar por el curso?")
		$(".contBody").html('<img src="img/ayudaPop.svg" alt="" class="imgAyudaPop">');
		$(".imgAyudaPop").show();
		$contNivel2.find(".moduloN2").text("ayuda");
	}else{
		$contNivel2.find(".moduloN2").text($modulosArray[$temaActual-1]);
	}
	
	/// animacion del pop
	$(".contNivel2").fadeIn("slow", function(){
		$myCarousel.find(".active").removeClass("d-none");
		consultarObligatorios();
	});
	


	
	if(cierra == false){
		$contNivel2.fadeOut();
		$contNivel2.removeClass("true");
		if($contNivel2.hasClass("ayuda")){
			$contNivel2.removeClass("ayuda")
		   }
		$myCarousel.carousel(0);
		$contBody.empty();
		$(".carousel-indicators").empty();
		$myCarousel.carousel('dispose');
		
		console.log("false");
		console.log("LARGO DEL MODULO ACTUAL COMPLETADO >>>>>> " + $modActual.length);
	   }
}

function colocoSubtitulo(){
	$subTitul = $('.carousel-inner > div.active').data("subtitulo");
	console.log("SUBTITULO======="+$subTitul)
	$contNivel2.find(".subTitulo").text($subTitul)
}

function popFinalizado(){
	console.log("3____$FINALIZADO????????==== " + $finalizado);
	if(isMobile.any() || navigator.maxTouchPoints == 5){
		$(".contNivel2").fadeIn();
	}else{
		doAnimations($contNivel2, true);
	}
	$contNivel2.find(".moduloN2").text("");
	$contNivel2.find(".subTitulo").text("");
	$(".contBody").html('<div class="row m-5 justify-content-center align-content-center h-50"><h3 class="m-0"><strong>CONGRATULATIONS!</strong></h3><div class="col-12 text-center mt-5"><p>You have completed the Specific Recovery Model course.</p><p>Now please exit and access the test to evaluate what you have learned in this course. And remember: you can come back and review the concepts whenever you´d like.</p><p><strong>Thank you. See you soon!</strong></p></div></div>');
	$finalizadoVisto = true;
}

////////// POP 2 NIVEL //////////




////////// MENU //////////

function toogleMenu(){
	$("#colMenu").find("button").removeClass("visto");
	//mostramos o no el menu
	if($temaActual == 1){
		$menu.fadeOut();
		$textModulo.text("trailer");
		   $tituloModulo.text("")
		   $nModulo.text("");
		$modActual = window["$MtrailerArray"];
	   }else if($temaActual == 2){
		   $textModulo.text("intro");
		   $menu.fadeIn();
		   $btnInfograf.parent("li").hide();
		   $btnReto.parent("li").hide();
		   $btnInfo.parent("li").fadeIn();
		   $tituloModulo.text("")
		   $nModulo.text("");
		   $modActual = window["$MintroArray"];
		   $modActualPill = window["$MintroArrayPill"];
	   }else if($temaActual >= 3){
		   $menu.fadeIn();
		   $btnInfograf.parent("li").fadeIn();
		   $btnReto.parent("li").fadeIn();
		   $btnInfo.parent("li").fadeIn();
		   $textModulo.text("module");
		   numeroModuloActual = "0" + ($temaActual-2)
		   $nModulo.text(numeroModuloActual);
		   nombreModuloActual = $modulosArray[$temaActual-1]
		   $tituloModulo.text(nombreModuloActual);
		   $modActual = window["$M"+($temaActual - 2)+"Array"];
		   $modActualPill = window["$M"+($temaActual - 2)+"ArrayPill"];

	   }
	$contenidoCentral.one("webkitAnimationEnd animationend", function(){
		$contenidoCentral.removeClass("animate__backOutUp")
		$contenidoCentral.find("div").hide();
		$contenidoCentral.attr("data-active", $temaActual);
		$('[data-contenido="'+$temaActual+'"]').show();
		if($temaActual == 1){
			$contenidoCentral.find("div").show();
		}
		$contenidoCentral.addClass("animate__backInUp")
	});
}

/*$btnMenu.click(function(){
	toogleMenu(".indice", "Indice");
});

$btnDoc.click(function(){
	toogleMenu(".doc", "Documentación");
});*/



/*$cierraMenu.click(function(){
	toogleMenu("cierra");
});*/

/*$(".indice li").click(function(){
	$data = $(this).data("index");
	$myCarousel.carousel($data);
	toogleMenu();
})*/
/*
$btnNext.click(function(){
	avance();
})
$movilNext.click(function(){
	avance();
})
$btnPrev.click(function(){
	retrocede();
})
$movilPrev.click(function(){
	retrocede();
})
*/

function darlePlay(boton){
	$video = boton.parent('.contieneVideo').find('video').get(0);
	$video.play();
	console.log($video);
	console.log("clikPkayedl")
}



    //////////////////////////////////////////////// GENERA PAGINAS ////////////////////////////////////////////////	
//var $totalPaginas = 53;
var content = [];
function generoIndicators(){
	console.log("LENGTH CAROUSEL ITEMS?????? "+$('.carousel-item').length)
	$cantidadItems = $('.carousel-item').length;
	$totalPaginas = $cantidadItems;
	console.log("TOTAL PAGINA====== "+$totalPaginas)
	for(var $item = 0; $item < $cantidadItems; $item++){
		if($item == 0){
			$(".carousel-indicators").append('<li data-target="#contenidoM" data-slide-to="'+$item+'" class="active"></li>')
		   }else{
			$(".carousel-indicators").append('<li data-target="#contenidoM" data-slide-to="'+$item+'" class="inactivo"></li>')
		   }
	}
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
function esIOs(){
    return (
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i))
    );
}
function $recargarCarrousel(){
	  $myCarousel.carousel({
	  touch: false
  });

////////// SLID.BS //////////
$myCarousel.on("slid.bs.carousel", function(e) {
		conocerIndex();
		flechasonoff();
	colocoSubtitulo();
		//nombraModulo();	
	$(".collapse").removeClass("show");
		if($modActualPill.indexOf($pagActual) == -1){
		$(".carousel-control-next").addClass("btnInactivo");
	}else{
		$(".carousel-control-next").removeClass("btnInactivo");
	}
	if(isMobile.any() || navigator.maxTouchPoints == 5){
		consultarObligatorios();
	}
});
////////// SLIDE.BS //////////
$myCarousel.on("slide.bs.carousel", function(e) {
	if(isMobile.any() || navigator.maxTouchPoints == 5){
		
	}else{
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimationsSlide($animatingElems);
	}

  });
}
function $cargarPill(){
	$(".controlesAvance").show();
			if($temaActual == 1){
				$modulo = $temaActual - 1
			}else{
				$modulo = $temaActual - 2
			}
	
			console.log("MODULO A CARGAR ========= cont/m"+$modulo);
			  $myCarousel.carousel({
				  touch: false
			  });
			$.get("cont/m" + $modulo +".html",  function(htmlexterno){
			content = $('<div>').append(htmlexterno).find('.carousel-inner');
			$(".contBody").html(content);
				conocerIndex();
				generoIndicators();
				colocoSubtitulo();
				flechasonoff();
				$comprueboArrayPill();		
		});	//GET
}



//////////////////////////////////////////////// PDF ////////////////////////////////////////////////

	function $cargarPdf(n){
		$(".controlesAvance").hide();
		if($temaActual == 1){
			$modulo = $temaActual - 1
		}else{
			$modulo = $temaActual - 2
		}
		$pdfURL = "pdf/m"+$modulo+"infografia.pdf";
		if(isMobile.any() || navigator.maxTouchPoints == 5){
		   window.open($pdfURL);	
		   }else{
			   $contNivel2.find(".subTitulo").text("INFOGRAPHIC");
			$("#pdfObj").attr("data", $pdfURL);
			$("#pdfEmb").attr('src', $pdfURL);
			$("#pdfA").attr('src', $pdfURL);
			$(".contBody").html("<object data='"+$pdfURL+"' type='application/pdf' id='pdfObj'><p>It appears you don't have Adobe Reader or PDF support in this web browser. <a href='"+$pdfURL+"' id='pdfA'>Click here to download the PDF</a>. Or <a href='http://get.adobe.com/reader/' target='_blank'>click here to install Adobe Reader</a>.</p><embed src='"+$pdfURL+"' type='application/pdf' id='pdfEmb'/></object>");
		   }
    }
	
//////////////////////////////////////////////// INFO ADICIONAL ////////////////////////////////////////////////

	function $cargarInfo(){
		$(".controlesAvance").hide();
		if($temaActual == 1){
			$modulo = $temaActual - 1
		}else{
			$modulo = $temaActual - 2
		}
		$('#infoadicional > #'+$modulo).show();
	}

//////////////////////////////////////////////// RETO ////////////////////////////////////////////////

	function $cargarRETO(n){
		$(".controlesAvance").hide();
		if($temaActual == 1){
			$modulo = $temaActual - 1
		}else{
			$modulo = $temaActual - 2
		}
		$retoURL = "reto/m"+$modulo+"/index.html"
		//$retoURL = "https://www.mdicursos.com/~produccion/Mapfre_microrretos/Modulo_"+$modulo+"_ENG/"
		$contNivel2.find(".subTitulo").text("MICROCHALLENGE");
		
		$(".contBody").html('<iframe src="'+$retoURL+'" frameborder="0" id="iframeCont"></iframe>');
    }
////////// FUNCION AVANCE //////////


// actualizamos la info del suspend data guardamos tiempo y la info en el lms
function actualizaSuspend(){
	console.log("ACTUALIZA XCIENTO==========="+porcentaje);
	console.log("VISTOS ARRAY==========="+JSON.stringify($CursoData));
	console.log("TEMA ACTUAL LESSON LOCATION==========="+$temaActual);
	$sdataCompleto = JSON.stringify($CursoData).replace(/\"/g, '*');
	if(porcentaje >= 99){
		console.log("COMPLETED");
		$lessonStatus = "completed";
		if($finalizadoVisto == false){
			$finalizado = true;
		}
		
	}else{
		   console.log("INCOMPLETE");
		   $lessonStatus = "incomplete"
	   }
	computeTime();
	guardaLMS($sdataCompleto, $temaActual, porcentaje, $lessonStatus)
}

function $comprueboArray(){
	console.log("COMPROBANDO ARRAY_1");
	$.each($modActual, function () {
		$posM = this;
		console.log("COMPROBANDO ARRAY_2 >>>>>>>> $posM===" + $posM)
		console.log("modulosPOS========="+$posM);
		console.log("LARGO MODULO VISTO >>>>>>>>" + $modActual.length);
		$("#colMenu").find("button[data-valor="+$posM+"]").addClass("visto");
		console.log("VISTOS ARRAY_2==========="+JSON.stringify($CursoData));
		//$(".indice li[data-lista="+$posM+"] i").text("lock_open");
		comprueboMcompleto();
	});
	
}
function $comprueboArrayinfo(){
	if($infoAdicionalVisto.indexOf($temaActual)!= -1){
		$("#colMenu").find(".btnInfo").addClass("visto");
	}
}
function $comprueboArrayPill(){
	console.log("COMPROBANDO ARRAY PILL")
	$.each($modActualPill, function () {
		$posM = this;
		console.log("COMPROBANDO ARRAY PILL >>>>>>>> $posM===" + $posM)
		//$myCarousel.carousel($posM);
		$btnNext.removeClass("btnInactivo");
		$(".carousel-indicators").find("li[data-slide-to="+($posM-1)+"]").removeClass("inactivo").addClass("visto");
		$(".carousel-indicators").find("li[data-slide-to="+($posM)+"]").removeClass("inactivo");
		$("#"+$posM).find(".obligatorio").removeClass("obligatorio").addClass("visto")
		//consultarObligatorios();
	});
	
}
   function actualizaPorciento(){
	   
	   $valorTrailer = 10;
	   $valorModulo = 15;
	   var $elementosVistos = $vistosArray.length;
	   if($elementosVistos == 1){
		   porcentaje = porcentaje + $valorTrailer;
	   }else if($elementosVistos > 1){
		   if(porcentaje < 100){
			   porcentaje = (($elementosVistos-1)*$valorModulo) + $valorTrailer
		   }
		   
	   }
	   console.log("PORCENTAJE >>>>>>>>"+porcentaje);
        //porcentaje = (Math.round(($elementosVistos / $totalPaginas)*100));
        //$('.progress-value > div').text(porcentaje + "%");
        //var pct = ((100-porcentaje)/100)*c;
        //$('.progress').attr('data-percentage',porcentaje);
        //$circle.css({ strokeDashoffset: pct});
	   actualizaSuspend();
    }


//consultamos los elementos que hay que cliekear en la pagina para saber si se vieron o no y asi poder avanzar
		function consultarObligatorios() {
			console.log("*******CONSULTO OBLIGATORIOS*******");
			console.log("ESTA PAGINA FUE VISTA? (si es -1 NO)====== "+ $modActualPill.indexOf($pagActual));
			console.log("PAGINA ACTUAL ====== "+ $pagActual)
			if($modActualPill.indexOf($pagActual) == -1){
				console.log("PAGINA VISTA!!!!!");
				var paginaObligatorios = $('div.active').find(".obligatorio");
			
			if (paginaObligatorios.length == 0) {
				if($pagActual != $totalPaginas){
					$(".carousel-control-next").removeClass("btnInactivo").addClass("animNext").one("webkitAnimationEnd animationend", function(){
					$(".carousel-control-next").removeClass("animNext").addClass("d-flex");
					});
					//$("footer.movil .next").removeClass("nextInactivo");
				}else{
					if($modActual.indexOf($dataValor) == -1){
						$modActual.push($dataValor);
					}
				}
	
				$modActualPill.push($pagActual);
				
				$(".carousel-indicators li[data-slide-to="+($pagActual - 1)+"]").addClass("visto");
				$(".carousel-indicators li[data-slide-to="+($pagActual)+"]").removeClass("inactivo");
				//actualizaPorciento();
			}
			   }else{
				   $(".carousel-control-next").removeClass("btnInactivo");
			   }
			//console.log("OBLIGATORIOS EN PAGINA >>>>>> "+paginaObligatorios.length)
			actualizaSuspend();
			console.log("ESTADO CURSO >>>>>>> " + JSON.stringify($CursoData))
			console.log("ESTADO ARRAY ACTUAL >>>>>>> " + $modActualPill)
	
		}
function paginaVista(){
	if($modActualPill.indexOf($pagActual) == -1){
		if($modActual.indexOf($dataValor) == -1){
			$modActual.push($dataValor);
		}
		$modActualPill.push($pagActual);
		$(".carousel-indicators li[data-slide-to="+($pagActual - 1)+"]").addClass("visto");
		$(".carousel-indicators li[data-slide-to="+($pagActual)+"]").removeClass("inactivo");
		actualizaSuspend();
	}
}

function nombraModulo(){
/*	if($pagActual >= 2 && $pagActual <= 8){
	   $moduloN.text("M1");
	   $moduloNom.text($modulosArray[0]);
		$moduloDIV.fadeIn();
	}else if($pagActual >= 10 && $pagActual <= 22){
	   $moduloN.text("M2");
	   $moduloNom.text($modulosArray[1]);
		$moduloDIV.fadeIn();
	} else if($pagActual >= 24 && $pagActual <= 34){
	   $moduloN.text("M3");
	   $moduloNom.text($modulosArray[2]);
		$moduloDIV.fadeIn();
	} else if($pagActual >= 36 && $pagActual <= 38){
	   $moduloN.text("M4");
	   $moduloNom.text($modulosArray[3]);
		$moduloDIV.fadeIn();
	} else if($pagActual >= 40 && $pagActual <= 42){
	   $moduloN.text("M5");
	   $moduloNom.text($modulosArray[4]);
		$moduloDIV.fadeIn();
	} else if($pagActual >= 44 && $pagActual <= 52){
	   $moduloN.text("M6");
	   $moduloNom.text($modulosArray[5]);
		$moduloDIV.fadeIn();
	} else{
		$moduloDIV.fadeOut()
	}*/
}


////////// LOCALIZO EN QUE PAGINA ESTOY //////////
function conocerIndex(){
	$temaActual = $("#bg").data("tema");
	console.log("$temaActual======="+$temaActual);
	$('#indicadores li[data-index="'+$temaActual+'"]').addClass("actual")
	toogleMenu();
	$pagActual = $('.carousel-inner > div.active').attr("id");
	$(".carousel-indicators li").removeClass("active");
	$(".carousel-indicators li[data-slide-to="+($pagActual - 1)+"]").addClass("active");
	console.log("MODULO ACTUAL PILDORA >>>>>> "+$modActualPill);
	console.log("PAGINA ACTUAL PILDORA======== "+$pagActual);
	if(porcentaje > 1){
	   actualizaSuspend();
	}
	//actualizaSuspend();
}

function pestania(){
	        // Inhibe la acción del link en el link de una pestaña inactiva
        $('#pestana-inactiva-link').click(function(e) {
            e.preventDefault();
            
        });
        
        $('.pestana-link').click(function(e) {
            
            var id = $(this).attr("aria-controls");
            
            $(this).parents(".rps-pestanias").find("[data-value='"+id+"']").trigger('click');
            
        });
}

function nextModulo(){
	$('#indicadores li[data-index="'+($temaActual+1)+'"]').removeClass("disabled");
	$('#indicadores li[data-index="'+($temaActual+1)+'"]').find("i").removeClass("icon-lock").addClass("icon-unlock");
}

function comprueboMcompleto(){
	console.log("*************COMPRUEBO MODULO COMPLETADO*************")
	if($temaActual==2){
		if($modActual.length == 1){
			if($vistosArray.indexOf($temaActual)==-1){
			   $vistosArray.push($temaActual);
				actualizaPorciento();
				nextModulo();
			   }
		   }
	}else if($temaActual >= 3){
		if($modActual.length ==3){
			console.log("*****MODULO " +$modActual + " LARGO " +$modActual.length+ "*************")
			if($vistosArray.indexOf($temaActual)==-1){
			   $vistosArray.push($temaActual);
				actualizaPorciento();
				nextModulo();
			   }
		   }
	}
	
}

	function colocaTema(){
		var $tema = $temaActual;
		if($tema == 2){
			$contenidoCentral.parent('div').removeClass("mt-5 pt-5 offset-1 col-6 col-7").addClass("col-8 offset-0");
			$("#colMenu").removeClass("offset-1").addClass("offset-0");
		   }else if($tema == 1){
			$contenidoCentral.parent('div').removeClass("offset-0 col-8 col-6").addClass("col-7 offset-1");
			$("#colMenu").addClass("offset-1").removeClass("offset-0");
		   }else{
			    $contenidoCentral.parent('div').removeClass("col-8 col-7 offset-0").addClass("mt-5 pt-5 offset-1 col-6"); 
			 $("#colMenu").addClass("offset-1").removeClass("offset-0");
		   }
		$('#bg').attr('data-tema', $tema);
		$('#bg').data('tema', $tema);
		$contenidoCentral.attr('data-active', $temaActual);
		$('div[data-contenido]').hide();
		$('div[data-contenido="'+$temaActual+'"]').show();
		$("#indicadores li[data-index]").removeClass("actual");
		conocerIndex();
		toogleMenu();
		$comprueboArray();
		$comprueboArrayinfo();
	}


////////// INICIALIZA //////////
function comenzar(dato){
	/*if(dato == "ayuda"){
		$ayuda.fadeOut("slow", function(){
		if(dato == "volver"){
		}else{
		}
	});
		
	}else{
		$inicio.fadeOut("slow", function(){
		if(dato == "volver"){
		}else{
		}
	});
	}*/
	if($contexMenu != 0){
		$(document).bind("contextmenu",function(e){
			return false;
		}); 
	}
	

	console.log("FUNCION COMENZAR")
	conocerIndex();
	
	$btnNivel2.click(function(){
		if($(this).hasClass("btnPils")){
			$dataValor = $(this).data("valor");
			$recargarCarrousel();
			$cargarPill();
		}

	if(!$(this).hasClass("btnPils")){
			
		
			if(!$(this).hasClass("btnInfo")){
				$dataValor = $(this).data("valor");
				if($modActual.indexOf($dataValor) == -1){
					$modActual.push($dataValor);
				}				
			}		

		
			if($(this).hasClass("btnInfografia")){
				$cargarPdf();				
			}
			
			if($(this).hasClass("btnReto")){
				$cargarRETO();
			}

		}

		
		if(isMobile.any() || navigator.maxTouchPoints == 5){
			$comprueboArray();
			$comprueboArrayinfo();
			if(!$(this).hasClass("btnInfo") && !$(this).hasClass("btnInfografia")){
					pop2Nivelios(dato, true);				
			}
		}else{
			if(!$(this).hasClass("btnInfo")){
					pop2Nivel(dato, true);				
			}
		}

		
		console.log("ESTADO CURSO >>>>>>> " + JSON.stringify($CursoData));
		actualizaSuspend();
	});	
	
	$cerrarNivel2.click(function(){
		if(isMobile.any() || navigator.maxTouchPoints == 5){
			pop2Nivelios(dato, false);
			$comprueboArray();
			$comprueboArrayinfo();
		}else{
			pop2Nivel(dato, false);
			$comprueboArray();
			$comprueboArrayinfo();
		}
		
	});
	
	$btnNext.hover(function(){
		$(this).removeClass("animNext");
	})
	
	$btnAyuda.click(function(){
		$(".controlesAvance").hide();
		$contNivel2.addClass("ayuda");
		pop2Nivel(dato, true);
	});
	
	$btnInfo.click(function(){
		$cargarInfo();
		$(this).addClass("visto");
		if($infoAdicionalVisto.indexOf($temaActual) == -1){
		   $infoAdicionalVisto.push($temaActual);
			actualizaSuspend();
		}
	});
	
	$('.btnSalir').click(function(){
		$(".modal-backdrop").fadeIn();
	});
	
	$('.salirsi').click(function(){
		cerrar();
	});
	
	$('.salirno').click(function(){
		$(".modal").modal('hide');
	});	
	
	$('#infoAditional a').click(function(){
		$(this).addClass("visto");
	});
	
	
		function cerrar(){
	window.close();
	top.close();
}

	
	$('*[data-toggle="modal"]').click(function(){
		$('<div class="modal-backdrop"></div>').appendTo('#contenedor');
		$(".modal-backdrop").fadeIn();
	});	

	
$('video').bind("timeupdate pause", function(){
	$tiempoVideo = $('#video').get(0).currentTime;
	$tiempoCorte = 140.50
	if($vistosArray.indexOf($temaActual) == -1){
		if($tiempoVideo >= $tiempoCorte){
			nextModulo();
			$vistosArray.push($temaActual);
			comprueboMcompleto();
			actualizaPorciento();
		}
	}
});
	
	
/*$(".playVideo").click(function(){
	darlePlay($(this));
})

$('video').on("playing", function(){
	$(this).parent('.contieneVideo').find('i').removeClass("d-md-block");
	console.log("play video")
})
$('video').on("ended, pause", function(){
	$(this).parent('.contieneVideo').find('i').addClass("d-md-block");
	console.log("enda pause video")
})*/

	
/*	$('button[data-toggle="modal"').click(function(){
		var $file = 'cont/p'+ $pagActual +'.html';
		var $target = $(this).data("target");
		var $titulo = $(this).data("titulo");
		var $contPop = $(this).data("contpop");
		$($target).find('.modal-body').empty();
		$($target).find('.modal-title').text($titulo);
		console.log("DATA_ESTA???========" + $contPop);
		if($contPop == undefined){
			$($target).find('.modal-body').load($file + ' #popContenido');
		   }else{
			$($target).find('.modal-body').load($file + ' #popContenido' + $contPop);
		   }
		
	});*/	
	

	
	$('#indicadores > li').click(function(){
		$contenidoCentral.addClass("animate__backOutUp");
		$("video").each(function(){
				this.pause();
			this.currentTime = 0;
		})
		var $tema = $(this).data("index");
		if($tema == 2){
			$contenidoCentral.parent('div').removeClass("mt-0 pt-5 offset-1 col-6 col-7").addClass("col-8 offset-0 mt-5");
			$("#colMenu").removeClass("offset-1").addClass("offset-0");
		   }else if($tema == 1){
			$contenidoCentral.parent('div').removeClass("offset-0 col-8 col-6 mt-5").addClass("col-7 offset-1 mt-0 pt-5");
			$("#colMenu").addClass("offset-1").removeClass("offset-0");
		   }else{
			    $contenidoCentral.parent('div').removeClass("col-8 col-7 offset-0").addClass("mt-5 pt-5 offset-1 col-6"); 
			 $("#colMenu").addClass("offset-1").removeClass("offset-0");
		   }
		console.log("$tema======"+$tema)
		$('#bg').attr('data-tema', $tema);
		$('#bg').data('tema', $tema);
		$('.actual').removeClass("actual")
		conocerIndex();
		$comprueboArray();
		$comprueboArrayinfo();
	});	
	

	
/*		$('[data-toggle="tooltip"]').tooltip({
			animation:true,
			trigger:"hover"
		})*/
}


$inicioComenzar.click(function(){
	comenzar()
});
$ayudaComenzar.click(function(){
	comenzar("ayuda")
});

$volverLocation.click(function(){
	comenzar("volver")
});



 
    //////////////////////////////////////////////// READY!!!!!!!! ////////////////////////////////////////////////	
	//////////////////////////////////////////////// LOADING ////////////////////////////////////////////////

	$(".spinner-box").fadeIn();


$(document).ready(function () {
	 console.log("navigator.userAgent>>>>>> "+navigator.userAgent)
	 console.log("navigator.maxTouchPoints>>>>>> "+navigator.maxTouchPoints)
	comenzar();
   	//$cargarPaginas();
	$ejecutaScorm();
});
