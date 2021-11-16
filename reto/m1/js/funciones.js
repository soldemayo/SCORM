
var escala= 1;
var altura= $(window).height();
var anchura= $(window).width();
var altoCurso= 700;
var anchoCurso= 1200;
var proporcionAlto= (altura/altoCurso).toFixed(2);
var proporcionAncho= (anchura/anchoCurso).toFixed(2);

var soundID_1 = "locucion_1";
var soundID_2 = "locucion_2";


var ordenCartas= ["","1","1_b","2","2_b","3","3_b","4","4_b","5","5_b","6","6_b"];
var puntos= 20;
var segundos= 60;
var segundosTotal= 120;
var prefijo= "01:";
var tiempo;
var porcentaje;
var cartasGiradas= 0;
var idCartasGiradas= ["","",""];
var aciertos= 0;
var comprobandoRespuesta= false;

var idioma= "esp";

var es_iPad= false;

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


$(document).ready(inicializarEventos);



function inicializarEventos(){
    es_iPad= esIOs();

    redimensionarContenido();
    $(window).resize(function() {
      redimensionarContenido();
    });

    $('#boton_comenzar').click(comenzarEjercicio);

    /*$('#boton_cerrar').click(abrirConfirmacion);
    $('#boton_confirmacion_si').click(SalirSCO);
    $('#boton_confirmacion_no').click(cerrarConfirmacion);*/
    
    
    barajarCartas();

    if(isMobile.any()){ 
        $(".front").each(function() {
            $(this).addClass("movil");
        });
        $(".back").each(function() {
            $(this).addClass("movil");
        });
    }
}

function esIOs(){
    return (
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i))
    );
}


/***************    REDIMENSIONAR CONTENIDO    *****************/

function redimensionarContenido() {
    if(es_iPad==null){
        altura= $(window).height();
        anchura= $(window).width();
    }
    else{
        altura= $(window.top).height();
        anchura= $(window.top).width();
    }

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



/***************    VENTANA CONFIRMACIÓN    *****************/

function abrirConfirmacion(){
    menuLateralAbierto= false;
    $('#menu_lateral').addClass('oculto');
    $('#fondo_menu_lateral').addClass('oculto');

    $('#confirmacion_salir').removeClass('oculto');
}
function cerrarConfirmacion(){
    $('#confirmacion_salir').addClass('oculto');
}


/***************    FUNCIONAMIENTO EJERCICIO    *****************/

function barajarCartas(){
    for (var i=1; i<ordenCartas.length; i++) {
      var numAleatorio= Math.floor((Math.random() * 12) + 1); 
      var auxiliar= ordenCartas[i];
      ordenCartas[i]= ordenCartas[numAleatorio];
      ordenCartas[numAleatorio]= auxiliar;
    }
    console.log(ordenCartas);

    for (var i=1; i<ordenCartas.length; i++) {
        $('#reverso_'+i).html('<img src="images/carta_'+ordenCartas[i]+'.png" alt="">');
    }
}



function comenzarEjercicio(){
    $('.carta').bind("click touchend", girarCarta);
    
    $('#capa_anuladora').addClass('oculto');
    $('#boton_comenzar').addClass('oculto');
    tiempo = setInterval(controlTiempo, 1000);
}



function controlTiempo() {
    segundos--;
    segundosTotal--;

    if(segundos==9){ prefijo= prefijo+"0"; }

    $('#tiempo').html(prefijo+segundos);
    
    $('#cronometro').removeClass();
    $('#cronometro').addClass("c100 small");

    porcentaje= 100 - Math.floor((segundosTotal*100)/120);
    $('#cronometro').addClass("p"+porcentaje);

    if(segundos== 0 && prefijo== "01:0"){
        segundos= 60;
        prefijo= "00:"
    }
    else if(segundos== 0 && prefijo== "00:0"){
        puntos= 0;
        clearInterval(tiempo);
        finalizarEjercicio();
    }
}




function girarCarta(){
    if(!$(this).hasClass('girado') && !comprobandoRespuesta){
        cartasGiradas++;
        $(this).addClass('girado');

        idCartasGiradas[cartasGiradas]= $(this).attr('id');
        console.log(idCartasGiradas);

        if(cartasGiradas==2){
            comprobarRespuesta();
        }
    }
}



function comprobarRespuesta(){
    comprobandoRespuesta= true;
    createjs.Sound.removeAllSounds();

    var aux= idCartasGiradas[1].split('_');
    var posicion_1= aux[1];
    aux= idCartasGiradas[2].split('_');
    var posicion_2= aux[1];

    //$('#capa_anuladora').removeClass("oculto");
    //$('#capa_anuladora').css("opacity", 0);

    console.log("ordenCartas[posicion_1]: "+ordenCartas[posicion_1]);
    console.log("ordenCartas[posicion_2]: "+ordenCartas[posicion_2]);

    var carta1= ordenCartas[posicion_1].split('_');
    var id_carta1= carta1[0];
    var carta2= ordenCartas[posicion_2].split('_');
    var id_carta2= carta2[0];
console.log("id_carta1: "+id_carta1);
console.log("id_carta2: "+id_carta2);

    if(id_carta1==id_carta2){
        //$('#capa_anuladora').addClass("oculto");
        comprobandoRespuesta= false;
        aciertos++;

        cartasGiradas= 0;
        idCartasGiradas[1]= "";
        idCartasGiradas[2]= "";
        $('#'+idCartasGiradas[1]).removeClass("carta");
        $('#'+idCartasGiradas[2]).removeClass("carta");

        comprobarFin();

        createjs.Sound.registerSound("sonidos/resp_correcta.mp3", soundID_1);
        createjs.Sound.addEventListener("fileload", handleFileLoad);
        function handleFileLoad(event) {
          if(event.id=="locucion_1"){
            var instancia = createjs.Sound.play(soundID_1);
            }
          createjs.Sound.removeEventListener("fileload", handleFileLoad);
          }
    }
    else{
        createjs.Sound.registerSound("sonidos/resp_incorrecta.mp3", soundID_1);
        createjs.Sound.addEventListener("fileload", handleFileLoad);
        function handleFileLoad(event) {
          function handleComplete(event) {
            //$('#capa_anuladora').addClass("oculto");            

            $('#'+idCartasGiradas[1]).removeClass("girado");
            $('#'+idCartasGiradas[2]).removeClass("girado");
            $('#'+idCartasGiradas[1]).addClass("carta");
            $('#'+idCartasGiradas[2]).addClass("carta");

            cartasGiradas= 0;
            idCartasGiradas[1]= "";
            idCartasGiradas[2]= "";
            comprobandoRespuesta= false;
            }

          if(event.id=="locucion_1"){
            var instancia = createjs.Sound.play(soundID_1);
            instancia.on("complete", handleComplete);
            }
          createjs.Sound.removeEventListener("fileload", handleFileLoad);
          }
    }
}



function comprobarFin(){
    if(aciertos==6){
        clearInterval(tiempo);
        finalizarEjercicio("bien");
    }
}



function finalizarEjercicio(resultado){
    //$('#capa_anuladora').css("opacity", 1);
    $('#capa_anuladora').removeClass('oculto');
    $('#capa_anuladora').removeClass('delay_3');
    
    $('#puntuacion').html(puntos);
    $('#nota').html(puntos);
    $('#feedback').removeClass('oculto');

    /*LMS_Score= puntos;
    LMS_lesson_status= "completed";
    registraDatos();*/
}




