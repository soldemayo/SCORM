
var escala= 1;
var altura= $(window).height();
var anchura= $(window).width();
var altoCurso= 700;
var anchoCurso= 1200;
var proporcionAlto= (altura/altoCurso).toFixed(2);
var proporcionAncho= (anchura/anchoCurso).toFixed(2);

var soundID_1 = "locucion_1";
var soundID_2 = "locucion_2";


var ordenPalabras= [0,1,2,3,4,5,6,7,8];
var seleccionPalabras= [0,1,2,3,4,5,6,7,8];
var intentosPalabras= [0,0,0,0,0,0,0,0,0];
var resultados= [0,0,0,0,0,0,0,0,0]; // el cero es no realizada, el 1 es en espera, el 2 acertada y el -1 fallada
var puntos= 0;
var segundos= 30;
var segundosTotal= 150;
var tiempo;
var prefijo= "02:";
var porcentaje;
var aciertos= 0;
var palabraActual= 1;
var palabrasPendientes= 8;

var estructuraPalabras = JSON.parse(palabras);

var es_iPad= false;

$(document).ready(inicializarEventos);



function inicializarEventos(){
    es_iPad= esIOs();

    redimensionarContenido();
    $(window).resize(function() {
      redimensionarContenido();
    });

    /*$('#boton_cerrar').click(abrirConfirmacion);
    $('#boton_confirmacion_si').click(SalirSCO);
    $('#boton_confirmacion_no').click(cerrarConfirmacion);*/
    
    $('#boton_comenzar').bind("click touchend", comenzarEjercicio);
    
    $('#boton_pasapalabra').bind("click touchend", pasarPalabra);
    $('#boton_comprobar').bind("click touchend", comprobarPalabra);

    //barajar();
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
/*
function barajar(){
    for (var i=1; i<ordenPalabras.length; i++) {
      var numAleatorio= Math.floor((Math.random() * 18) + 1); 
      var auxiliar= ordenPalabras[i];
      ordenPalabras[i]= ordenPalabras[numAleatorio];
      ordenPalabras[numAleatorio]= auxiliar;
    }

    // lo ordenamos
    for (var i=1; i<6; i++) {
      seleccionPalabras[i]= ordenPalabras[i];
    }
    seleccionPalabras.sort(function(a, b){return a-b});

    console.log(seleccionPalabras);
}
*/


function comenzarEjercicio(){
    for (var i=1; i<9; i++) {
      $('#letra_'+estructuraPalabras.textos[seleccionPalabras[i]].inicial+'_inactiva').addClass('oculto');
      $('#letra_'+estructuraPalabras.textos[seleccionPalabras[i]].inicial+'_activa').removeClass('oculto');
    }

    $('#capa_anuladora').addClass('oculto');
    $('#boton_comenzar').addClass('oculto');
    $('#contenido_definiciones').removeClass('oculto');
    $("#txtRespuesta").val("");

    tiempo = setInterval(controlTiempo, 1000);

    montarPregunta();
}


function controlTiempo() {
    segundos--;
    segundosTotal--;

    if(segundos==9){ prefijo= prefijo+"0"; }

    $('#tiempo').html(prefijo+segundos);
    
    $('#cronometro').removeClass();
    $('#cronometro').addClass("c100 small");

    porcentaje= 100 - Math.floor((segundosTotal*100)/150);
    $('#cronometro').addClass("p"+porcentaje);

    if(segundos== 0 && prefijo== "02:0"){
        segundos= 60;
        prefijo= "01:"
    }
    else if(segundos== 0 && prefijo== "01:0"){
        segundos= 60;
        prefijo= "00:"
    }
    else if(segundos== 0 && prefijo== "00:0"){
        clearInterval(tiempo);
        finalizarEjercicio("mal");
    }
}





function pasarPalabra(){
    console.log("PASO PALABRA");
    $("#txtRespuesta").val("");

    if(resultados[palabraActual]== 0){
        $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_activa').addClass('oculto');
        $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_espera').removeClass('oculto');
    }

    if(palabraActual==8){
        palabraActual= 1;
    }
    else{
        palabraActual++;
    }
    
    montarPregunta();
}


function montarPregunta(){
    if(resultados[palabraActual]== 2 || resultados[palabraActual]== -1){
        pasarPalabra();
    }
    else{
        $('#titulo').html(estructuraPalabras.textos[seleccionPalabras[palabraActual]].enunciado);
        $('#pregunta').html(estructuraPalabras.textos[seleccionPalabras[palabraActual]].pregunta);
    }
}


function comprobarPalabra(){
    createjs.Sound.removeAllSounds();

    var respuesta= $("#txtRespuesta").val().toUpperCase();
    var solucion1= estructuraPalabras.textos[seleccionPalabras[palabraActual]].solucion_1.toUpperCase();
    var solucion2= estructuraPalabras.textos[seleccionPalabras[palabraActual]].solucion_2.toUpperCase();
    var solucion3= estructuraPalabras.textos[seleccionPalabras[palabraActual]].solucion_3.toUpperCase();
    var solucion4= estructuraPalabras.textos[seleccionPalabras[palabraActual]].solucion_4.toUpperCase();

console.log("respuesta: "+respuesta);
console.log("solucion1: "+solucion1);
console.log("solucion2: "+solucion2);

    if(respuesta==solucion1 || respuesta==solucion2 || respuesta==solucion3 || respuesta==solucion4){
        aciertos++;
        palabrasPendientes--;
        puntos= puntos+4;        
        resultados[palabraActual]= 2;
        $('#puntuacion').html(puntos);

        $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_activa').addClass('oculto');
        $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_espera').addClass('oculto');
        $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_correcta').removeClass('oculto');

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
            if($("#txtRespuesta").val()!=""){ intentosPalabras[palabraActual]++; }

            if(intentosPalabras[palabraActual]==2){
                palabrasPendientes--;
                resultados[palabraActual]= 2;
                $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_activa').addClass('oculto');
                $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_espera').addClass('oculto');
                $('#letra_'+estructuraPalabras.textos[seleccionPalabras[palabraActual]].inicial+'_incorrecta').removeClass('oculto');

                $("#txtRespuesta").val("");
                comprobarFin();
                }
            else{
                $("#txtRespuesta").val("");
                }
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
    if(aciertos==8){
        clearInterval(tiempo);
        finalizarEjercicio("bien");
    }
    else if(palabrasPendientes==0){
        clearInterval(tiempo);
        finalizarEjercicio("mal");
    }
    else{
        pasarPalabra();
    }
}



function finalizarEjercicio(resultado){
    //$('#capa_anuladora').css("opacity", 1);
    $('#capa_anuladora').removeClass('oculto');
    $('#capa_anuladora').addClass('animated zoomIn lenta delay_3');    
    
    $('#nota').html(puntos);
    $('#feedback').removeClass('oculto');
    

    /*LMS_Score= puntos;
    LMS_lesson_status= "completed";
    registraDatos();*/
}


