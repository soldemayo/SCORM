
var escala= 1;
var altura= $(window).height();
var anchura= $(window).width();
var altoCurso= 700;
var anchoCurso= 1200;
var proporcionAlto= (altura/altoCurso).toFixed(2);
var proporcionAncho= (anchura/anchoCurso).toFixed(2);

var soundID_1 = "locucion_1";
var soundID_2 = "locucion_2";

var es_iPad= false;


var puntos= 0;
var segundos= 60;
var segundosTotal= 180;
var tiempo;
var prefijo= "02:";
var porcentaje;

var aciertos= 0;

var letraSeleccionada= "";

var inicioCorrecta1= "13_1";
var finCorrecta1= "13_11";

var inicioCorrecta2= "3_11";
var finCorrecta2= "10_11";

var inicioCorrecta3= "1_2";
var finCorrecta3= "1_12";

var inicioCorrecta4= "7_1";
var finCorrecta4= "7_8";

var inicioCorrecta5= "6_1";
var finCorrecta5= "11_1";

var inicioCorrecta6= "6_5";
var finCorrecta6= "9_8";


var encontrada1= false;
var encontrada2= false;
var encontrada3= false;
var encontrada4= false;
var encontrada5= false;
var encontrada6= false;

var fin= false;

var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");



$(document).ready(inicializarEventos);



function inicializarEventos(){
    es_iPad= esIOs();

    redimensionarContenido();
    $(window).resize(function() {
      redimensionarContenido();
    });

    $('#boton_comenzar').bind("click touchstart", comenzarEjercicio);
    /*$('#boton_cerrar').click(abrirConfirmacion);
    $('#boton_confirmacion_si').click(SalirSCO);
    $('#boton_confirmacion_no').click(cerrarConfirmacion);*/
    
    $(".letra").click(seleccionarLetra);
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


function comenzarEjercicio(){
    $('#capa_anuladora').addClass('oculto');
    $('#boton_comenzar').addClass('oculto');

    tiempo = setInterval(controlTiempo, 1000);
}


function controlTiempo() {
    segundos--;
    segundosTotal--;
    console.log("YA");

    if(segundos==9){ prefijo= prefijo+"0"; }

    $('#tiempo').html(prefijo+segundos);
    
    $('#cronometro').removeClass();
    $('#cronometro').addClass("c100 small");

    porcentaje= 100 - Math.floor((segundosTotal*100)/180);
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
        finalizarEjercicio();
    }
}





function seleccionarLetra(){
    if(!fin){
        var identificador= $(this).attr('id');
        var coordenadas= identificador.split("_");
        //alert("fila: "+coordenadas[0]+" columna: "+coordenadas[1]);
        
        // si no hay ninguna letra seleccionada
        if(letraSeleccionada==""){
            $("#"+identificador).addClass('seleccionada');
            letraSeleccionada= identificador;
        }
        // si hay ya una seleccionada
        else{
            // si hemos pulsado la misma que está seleccionada la quitamos
            if(letraSeleccionada==identificador){
                    $("#"+identificador).removeClass('seleccionada');
                    letraSeleccionada= "";
                }
            // si no comprobamos que están unidas por una línea y vemos si son las buenas
            else{
                var coordenadasSeleccionada= letraSeleccionada.split("_");
                if(coordenadasSeleccionada[0]==coordenadas[0]){
                    //alert("en linea horizontal");
                    if(comprobarRespuesta(letraSeleccionada,identificador)){ dibujarLinea(coordenadasSeleccionada[1], coordenadasSeleccionada[0], coordenadas[1], coordenadas[0]); }
                    else{ dibujarError(coordenadasSeleccionada[1], coordenadasSeleccionada[0], coordenadas[1], coordenadas[0]); }
                }
                else if(coordenadasSeleccionada[1]==coordenadas[1]){
                    //alert("en linea vertical");
                    if(comprobarRespuesta(letraSeleccionada,identificador)){ dibujarLinea(coordenadasSeleccionada[1], coordenadasSeleccionada[0], coordenadas[1], coordenadas[0]); }
                    else{ dibujarError(coordenadasSeleccionada[1], coordenadasSeleccionada[0], coordenadas[1], coordenadas[0]); }
                }
                else if(Math.abs(coordenadasSeleccionada[0]-coordenadas[0])==Math.abs(coordenadasSeleccionada[1]-coordenadas[1])){
                    //alert("en linea diagonal");
                    if(comprobarRespuesta(letraSeleccionada,identificador)){ dibujarLinea(coordenadasSeleccionada[1], coordenadasSeleccionada[0], coordenadas[1], coordenadas[0]); }
                    else{ dibujarError(coordenadasSeleccionada[1], coordenadasSeleccionada[0], coordenadas[1], coordenadas[0]); }
                }
            }
        }
    }
}

function dibujarLinea(inicioX, inicioY, finX, finY){
    createjs.Sound.removeAllSounds();
    // calculamos las coordenadas con los ids de las celdas
    var posX_inicio= inicioX*43 - 20;
    var posY_inicio= inicioY*40 - 20;
    var posX_fin= finX*43 - 20;
    var posY_fin= finY*40 - 20;

    var contexto = canvas.getContext("2d");
    // definimos el grosor de la línea
    contexto.lineWidth = 32;
    // definimos el color de la línea
    contexto.strokeStyle = '#83d26b';

    // comenzamos la línea
    contexto.beginPath();
    contexto.lineCap="round";
    contexto.moveTo(posX_inicio,posY_inicio);
    contexto.lineTo(posX_fin,posY_fin);
    //contexto.closePath();
    contexto.stroke();
    contexto.save();

    $("#"+letraSeleccionada).removeClass('seleccionada');
    letraSeleccionada= "";

    puntos= puntos+5;
    $('#puntuacion').html(puntos);
    createjs.Sound.registerSound("sonidos/resp_correcta.mp3", soundID_1);
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    function handleFileLoad(event) {
      if(event.id=="locucion_1"){
        var instancia = createjs.Sound.play(soundID_1);
        }
      createjs.Sound.removeEventListener("fileload", handleFileLoad);
      }

    comprobarFin();
}

function dibujarError(inicioX, inicioY, finX, finY){
    createjs.Sound.removeAllSounds();
    // calculamos las coordenadas con los ids de las celdas
    var posX_inicio= inicioX*43 - 20;
    var posY_inicio= inicioY*40 - 20;
    var posX_fin= finX*43 - 20;
    var posY_fin= finY*40 - 20;

    var contexto2 = canvas2.getContext("2d");
    // definimos el grosor de la línea
    contexto2.lineWidth = 32;
    // definimos el color de la línea
    contexto2.strokeStyle = '#f24747';

    // comenzamos la línea
    contexto2.beginPath();
    contexto2.lineCap="round";
    contexto2.moveTo(posX_inicio,posY_inicio);
    contexto2.lineTo(posX_fin,posY_fin);
    contexto2.stroke();
    
    $("#"+letraSeleccionada).removeClass('seleccionada');
    letraSeleccionada= "";

    createjs.Sound.registerSound("sonidos/resp_incorrecta.mp3", soundID_1);
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    function handleFileLoad(event) {
      if(event.id=="locucion_1"){
        var instancia = createjs.Sound.play(soundID_1);
        }
      createjs.Sound.removeEventListener("fileload", handleFileLoad);
      }

    setTimeout(function(){
        contexto2.clearRect(0, 0, canvas2.width, canvas2.height);
        }, 1000);
}


function comprobarRespuesta(seleccion1, seleccion2){
    var resultado= false;

    if( (seleccion1==inicioCorrecta1 && seleccion2==finCorrecta1) || (seleccion1==finCorrecta1 && seleccion2==inicioCorrecta1) ) {
        resultado= true;
        encontrada1= true;
    }
    else if( (seleccion1==inicioCorrecta2 && seleccion2==finCorrecta2) || (seleccion1==finCorrecta2 && seleccion2==inicioCorrecta2) ) {
        resultado= true;
        encontrada2= true;
    }
    else if( (seleccion1==inicioCorrecta3 && seleccion2==finCorrecta3) || (seleccion1==finCorrecta3 && seleccion2==inicioCorrecta3) ) {
        resultado= true;
        encontrada3= true;
    }
    else if( (seleccion1==inicioCorrecta4 && seleccion2==finCorrecta4) || (seleccion1==finCorrecta4 && seleccion2==inicioCorrecta4) ) {
        resultado= true;
        encontrada4= true;
    }
    else if( (seleccion1==inicioCorrecta5 && seleccion2==finCorrecta5) || (seleccion1==finCorrecta5 && seleccion2==inicioCorrecta5) ) {
        resultado= true;
        encontrada5= true;
    }
    else if( (seleccion1==inicioCorrecta6 && seleccion2==finCorrecta6) || (seleccion1==finCorrecta6 && seleccion2==inicioCorrecta6) ) {
        resultado= true;
        encontrada6= true;
    }

    return resultado;
}

function comprobarFin(){
    if( encontrada1 && encontrada2 && encontrada3 && encontrada4 && encontrada5 && encontrada6) {
        fin= true;
        $(".letra").each(function( index ) {
            $(this).addClass('inactiva');
        });
        finalizarEjercicio();
    }
}



function finalizarEjercicio(resultado){
    clearInterval(tiempo);
    $('#capa_anuladora').removeClass('oculto');
    $('#capa_anuladora').addClass('animated fadeIn lenta delay_2');
    
    $('#nota').html(puntos);
    $('#feedback').removeClass('oculto');    

    /*LMS_Score= puntos;
    LMS_lesson_status= "completed";
    registraDatos();*/
}






