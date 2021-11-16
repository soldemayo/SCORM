
var altura= $(window).height();
var anchura= $(window).width();
var escala= 1;
var altoCurso= 1001;
var anchoCurso= 1920;
var proporcionAlto= (altura/altoCurso).toFixed(2);
var proporcionAncho= (anchura/anchoCurso).toFixed(2);
   


$(document).ready(activarRedimensionado);


function activarRedimensionado(){
    redimensionarContenido();
    $(window).resize(function() {
        redimensionarContenido();
    });
}


// Rediensionaos el #contenedor asi todo el contenido se ajusta al tamaño de pantalla y lo centramos en ella.
function redimensionarContenido() {
    altura= $(window).height();
    anchura= $(window).width();
	
//	console.log("ALTURA>>>>>> "+altura)
//	console.log("ANCHURA>>>>>> "+anchura)
	
    proporcionAlto= (altura/altoCurso).toFixed(2);
    proporcionAncho= (anchura/anchoCurso).toFixed(2);
	
    if(proporcionAlto < 1 || proporcionAncho < 1){
      if(proporcionAlto < proporcionAncho){ escala= proporcionAlto; }
      else{ escala= proporcionAncho; }
    }
    else{
      escala= 1;
    }

    $('#contenedor').css({"-ms-transform": "scale("+escala+","+escala+")", "-webkit-transform": "scale("+escala+","+escala+")", "transform": "scale("+escala+","+escala+")"});

    posicionarContenido();
}

function posicionarContenido() {
    var proporcionX= (anchura/(anchoCurso*escala)).toFixed(2);
    var proporcionY= (altura/(altoCurso*escala)).toFixed(2);

    var porcentajeX= 100/proporcionX;
    var porcentajeY= 100/proporcionY;

    if(porcentajeX > 100){ porcentajeX= 100; }
    if(porcentajeY > 100){ porcentajeY= 100; }

    var posicionX= (100 - porcentajeX)/2;
    var posicionY= (100 - porcentajeY)/2;

    $('#contenedor').css({"top": posicionY+"%", "left": posicionX+"%"});
}
