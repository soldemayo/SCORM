
var escala= 1;
var altura= $(window).height();
var anchura= $(window).width();
var altoCurso= 700;
var anchoCurso= 1200;
var proporcionAlto= (altura/altoCurso).toFixed(2);
var proporcionAncho= (anchura/anchoCurso).toFixed(2);

var soundID_1 = "locucion_1";
var soundID_2 = "locucion_2";


var posicionTop_1= [0, 0, 0, 0];
var posicionLeft_1= [0, 0, 0, 0];

var posicionTop_2= [0, 0, 0, 0];
var posicionLeft_2= [0, 0, 0, 0];

var posicionTop_3= [0, 0, 0, 0, 0, 0];
var posicionLeft_3= [0, 0, 0, 0, 0, 0];

var posicionTop_4= [0, 0, 0, 0, 0, 0];
var posicionLeft_4= [0, 0, 0, 0, 0, 0];
  
var posicionTop_5= [0, 0, 0, 0, 0,];
var posicionLeft_5= [0, 0, 0, 0, 0];

var puntos= 0;
var zonaSeleccionada= 0;
var etiquetaSeleccionada= 0;

var paso= 1;

var es_iPad= false;

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


    $("#boton_comprobar").bind("click touchend", comprobarPregunta);
    $("#boton_siguiente").bind("click touchend", siguientePregunta);
    $(".boton_zona").bind("click", seleccionarZona);
    $(".boton_etiqueta").bind("click", seleccionarEtiqueta);
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

    posicionTop_1[1]= $('#zona_1_1').css("top").replace('px','');
    posicionTop_1[2]= $('#zona_1_2').css("top").replace('px',''); 
    posicionTop_1[3]= $('#zona_1_3').css("top").replace('px','');
    posicionLeft_1[1]= $('#zona_1_1').css("left").replace('px','');
    posicionLeft_1[2]= $('#zona_1_2').css("left").replace('px','');
    posicionLeft_1[3]= $('#zona_1_3').css("left").replace('px','');

    posicionTop_2[1]= $('#zona_2_1').css("top").replace('px','');
    posicionTop_2[2]= $('#zona_2_2').css("top").replace('px','');
    posicionTop_2[3]= $('#zona_2_3').css("top").replace('px','');
    posicionLeft_2[1]= $('#zona_2_1').css("left").replace('px','');
    posicionLeft_2[2]= $('#zona_2_2').css("left").replace('px','');
    posicionLeft_2[3]= $('#zona_2_3').css("left").replace('px','');

    posicionTop_3[1]= $('#zona_3_1').css("top").replace('px','');
    posicionTop_3[2]= $('#zona_3_2').css("top").replace('px',''); 
    posicionTop_3[3]= $('#zona_3_3').css("top").replace('px','');
    posicionTop_3[4]= $('#zona_3_4').css("top").replace('px','');
    posicionTop_3[5]= $('#zona_3_5').css("top").replace('px','');
    posicionLeft_3[1]= $('#zona_3_1').css("left").replace('px','');
    posicionLeft_3[2]= $('#zona_3_2').css("left").replace('px','');
    posicionLeft_3[3]= $('#zona_3_3').css("left").replace('px','');
    posicionLeft_3[4]= $('#zona_3_4').css("left").replace('px','');
    posicionLeft_3[5]= $('#zona_3_5').css("left").replace('px','');

    posicionTop_4[1]= $('#zona_4_1').css("top").replace('px','');
    posicionTop_4[2]= $('#zona_4_2').css("top").replace('px',''); 
    posicionTop_4[3]= $('#zona_4_3').css("top").replace('px','');
    posicionTop_4[4]= $('#zona_4_4').css("top").replace('px','');
    posicionTop_4[5]= $('#zona_4_5').css("top").replace('px','');
    posicionLeft_4[1]= $('#zona_4_1').css("left").replace('px','');
    posicionLeft_4[2]= $('#zona_4_2').css("left").replace('px','');
    posicionLeft_4[3]= $('#zona_4_3').css("left").replace('px','');
    posicionLeft_4[4]= $('#zona_4_4').css("left").replace('px','');
    posicionLeft_4[5]= $('#zona_4_5').css("left").replace('px','');

    posicionTop_5[1]= $('#zona_5_1').css("top").replace('px','');
    posicionTop_5[2]= $('#zona_5_2').css("top").replace('px',''); 
    posicionTop_5[3]= $('#zona_5_3').css("top").replace('px','');
    posicionTop_5[4]= $('#zona_5_4').css("top").replace('px','');
    posicionLeft_5[1]= $('#zona_5_1').css("left").replace('px','');
    posicionLeft_5[2]= $('#zona_5_2').css("left").replace('px','');
    posicionLeft_5[3]= $('#zona_5_3').css("left").replace('px','');
    posicionLeft_5[4]= $('#zona_5_4').css("left").replace('px','');
}



function seleccionarZona(){
    var id= $(this).attr("id");
    var nombre= id.split("_");
    var numero= nombre[2];

    if($(this).hasClass("seleccionada")){
        $(this).removeClass("seleccionada");
        zonaSeleccionada= 0;
    }
    else{
        if(zonaSeleccionada!= 0){
            $("#zona_"+paso+"_"+zonaSeleccionada).removeClass("seleccionada");
        }
        $(this).addClass("seleccionada");
        zonaSeleccionada= numero;
        asociarElementos();
    }
}


function seleccionarEtiqueta(){
    var id= $(this).attr("id");
    var nombre= id.split("_");
    var numero= nombre[2];
    
    if($(this).hasClass("colocado")){
        $(this).removeClass("colocado");
        $(this).removeClass("1 2 3 4 5 6 7 8");
        colocarPosicionInicial(id);
    }
    else if($(this).hasClass("seleccionado")){
        $(this).removeClass("seleccionado");
        etiquetaSeleccionada= 0;
    }
    else{
        if(etiquetaSeleccionada!= 0){
            $("#etiq_"+paso+"_"+etiquetaSeleccionada).removeClass("seleccionado");
        }
        $(this).addClass("seleccionado");
        etiquetaSeleccionada= numero;
        asociarElementos();
    }
}



function colocarPosicionInicial(id){    
    if(id=="etiq_1_1"){ $('#'+id).animate({"top": "395px", "left": "60px" }, "normal" ); }
    if(id=="etiq_1_2"){ $('#'+id).animate({"top": "395px", "left": "335px" }, "normal" ); }
    if(id=="etiq_1_3"){ $('#'+id).animate({"top": "395px", "left": "605px" }, "normal" ); }

    if(id=="etiq_2_1"){ $('#'+id).animate({"top": "395px", "left": "60px" }, "normal" ); }
    if(id=="etiq_2_2"){ $('#'+id).animate({"top": "395px", "left": "335px" }, "normal" ); }
    if(id=="etiq_2_3"){ $('#'+id).animate({"top": "395px", "left": "605px" }, "normal" ); }

    if(id=="etiq_3_1"){ $('#'+id).animate({"top": "400px", "left": "40px" }, "normal" ); }
    if(id=="etiq_3_2"){ $('#'+id).animate({"top": "400px", "left": "325px" }, "normal" ); }
    if(id=="etiq_3_3"){ $('#'+id).animate({"top": "400px", "left": "605px" }, "normal" ); }
    if(id=="etiq_3_4"){ $('#'+id).animate({"top": "460px", "left": "180px" }, "normal" ); }
    if(id=="etiq_3_5"){ $('#'+id).animate({"top": "460px", "left": "470px" }, "normal" ); }

    if(id=="etiq_4_1"){ $('#'+id).animate({"top": "400px", "left": "40px" }, "normal" ); }
    if(id=="etiq_4_2"){ $('#'+id).animate({"top": "400px", "left": "325px" }, "normal" ); }
    if(id=="etiq_4_3"){ $('#'+id).animate({"top": "400px", "left": "605px" }, "normal" ); }
    if(id=="etiq_4_4"){ $('#'+id).animate({"top": "460px", "left": "180px" }, "normal" ); }
    if(id=="etiq_4_5"){ $('#'+id).animate({"top": "460px", "left": "470px" }, "normal" ); }

    if(id=="etiq_5_1"){ $('#'+id).animate({"top": "398px", "left": "25px" }, "normal" ); }
    if(id=="etiq_5_2"){ $('#'+id).animate({"top": "398px", "left": "239px" }, "normal" ); }
    if(id=="etiq_5_3"){ $('#'+id).animate({"top": "398px", "left": "452px" }, "normal" ); }
    if(id=="etiq_5_4"){ $('#'+id).animate({"top": "398px", "left": "664px" }, "normal" ); }
    
    comprobarActivacionValidar();
}


function asociarElementos(){    
    console.log("zona seleccionada: "+zonaSeleccionada);
    console.log("etiqueta seleccionada: "+etiquetaSeleccionada);

    if(zonaSeleccionada!=0 && etiquetaSeleccionada!= 0){
        if(paso==1){
            $('#etiq_1_'+etiquetaSeleccionada).animate({"top": posicionTop_1[zonaSeleccionada]+"px", "left": posicionLeft_1[zonaSeleccionada]+"px" }, "normal" );
        }
        else if(paso==2){
            $('#etiq_2_'+etiquetaSeleccionada).animate({"top": posicionTop_2[zonaSeleccionada]+"px", "left": posicionLeft_2[zonaSeleccionada]+"px" }, "normal" );
        }
        else if(paso==3){
            $('#etiq_3_'+etiquetaSeleccionada).animate({"top": posicionTop_3[zonaSeleccionada]+"px", "left": posicionLeft_3[zonaSeleccionada]+"px" }, "normal" );
        }
        else if(paso==4){
            $('#etiq_4_'+etiquetaSeleccionada).animate({"top": posicionTop_4[zonaSeleccionada]+"px", "left": posicionLeft_4[zonaSeleccionada]+"px" }, "normal" );
        }
        else if(paso==5){
            $('#etiq_5_'+etiquetaSeleccionada).animate({"top": posicionTop_5[zonaSeleccionada]+"px", "left": posicionLeft_5[zonaSeleccionada]+"px" }, "normal" );
        }
       
        $('#etiq_'+paso+"_"+etiquetaSeleccionada).addClass("colocado");
        $('#etiq_'+paso+"_"+etiquetaSeleccionada).addClass(zonaSeleccionada);
        $('#etiq_'+paso+"_"+etiquetaSeleccionada).removeClass("seleccionado");

        $('#zona_'+paso+"_"+zonaSeleccionada).removeClass("seleccionada");
        zonaSeleccionada= 0;
        etiquetaSeleccionada= 0;

        comprobarActivacionValidar();
    }
}


function comprobarActivacionValidar() {
    if(paso==1 && $('#etiq_1_1').hasClass('colocado') && $('#etiq_1_2').hasClass('colocado') && $('#etiq_1_3').hasClass('colocado')){
        $('#boton_comprobar').removeClass("oculto");
        $('#boton_comprobar_off').addClass("oculto");
    }
    else if(paso==2 && $('#etiq_2_1').hasClass('colocado') && $('#etiq_2_2').hasClass('colocado') && $('#etiq_2_3').hasClass('colocado')){
        $('#boton_comprobar').removeClass("oculto");
        $('#boton_comprobar_off').addClass("oculto");
    }
    else if(paso==3 && $('#etiq_3_1').hasClass('colocado') && $('#etiq_3_2').hasClass('colocado') && $('#etiq_3_3').hasClass('colocado') && $('#etiq_3_4').hasClass('colocado') && $('#etiq_3_5').hasClass('colocado')){
        $('#boton_comprobar').removeClass("oculto");
        $('#boton_comprobar_off').addClass("oculto");
    }
    else if(paso==4 && $('#etiq_4_1').hasClass('colocado') && $('#etiq_4_2').hasClass('colocado') && $('#etiq_4_3').hasClass('colocado') && $('#etiq_4_4').hasClass('colocado') && $('#etiq_4_5').hasClass('colocado')){
        $('#boton_comprobar').removeClass("oculto");
        $('#boton_comprobar_off').addClass("oculto");
    }
    else if(paso==5 && $('#etiq_5_1').hasClass('colocado') && $('#etiq_5_2').hasClass('colocado') && $('#etiq_5_3').hasClass('colocado') && $('#etiq_5_4').hasClass('colocado')){
        $('#boton_comprobar').removeClass("oculto");
        $('#boton_comprobar_off').addClass("oculto");
    }
    else{
        $('#boton_comprobar').addClass("oculto");
        $('#boton_comprobar_off').removeClass("oculto");
    }
}


function comprobarPregunta() {
    if(paso== 1){
        if($('#etiq_1_1').hasClass('2')){
            puntos++;
            $('#etiq_1_1').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_1_1');
            $('#etiq_1_1').addClass('incorrecto');
        }
        /////////
        if($('#etiq_1_2').hasClass('3')){
            puntos++;
            $('#etiq_1_2').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_1_2');
            $('#etiq_1_2').addClass('incorrecto');
        }
        /////////
        if($('#etiq_1_3').hasClass('1')){
            puntos++;
            $('#etiq_1_3').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_1_3');
            $('#etiq_1_3').addClass('incorrecto');
        }

        if($('#etiq_1_1').hasClass('correcto') && $('#etiq_1_2').hasClass('correcto') && $('#etiq_1_3').hasClass('correcto')){
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
              if(event.id=="locucion_1"){
                var instancia = createjs.Sound.play(soundID_1);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }
        }
    }
    else if(paso== 2){
        if($('#etiq_2_1').hasClass('2')){
            puntos++;
            $('#etiq_2_1').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_2_1');
            $('#etiq_2_1').addClass('incorrecto');
        }
        /////////
        if($('#etiq_2_2').hasClass('1')){
            puntos++;
            $('#etiq_2_2').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_2_2');
            $('#etiq_2_2').addClass('incorrecto');
        }
        /////////
        if($('#etiq_2_3').hasClass('3')){
            puntos++;
            $('#etiq_2_3').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_2_3');
            $('#etiq_2_3').addClass('incorrecto');
        }


        if($('#etiq_2_1').hasClass('correcto') && $('#etiq_2_2').hasClass('correcto') && $('#etiq_2_3').hasClass('correcto')){
            createjs.Sound.registerSound("sonidos/resp_correcta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }        
            }
        else{
            createjs.Sound.registerSound("sonidos/resp_incorrecta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }
        }
    }
    else if(paso== 3){
        if($('#etiq_3_1').hasClass('1')){
            puntos++;
            $('#etiq_3_1').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_3_1');
            $('#etiq_3_1').addClass('incorrecto');
        }
        /////////
        if($('#etiq_3_2').hasClass('3')){
            puntos++;
            $('#etiq_3_2').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_3_2');
            $('#etiq_3_2').addClass('incorrecto');
        }
        /////////
        if($('#etiq_3_3').hasClass('2')){
            puntos++;
            $('#etiq_3_3').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_3_3');
            $('#etiq_3_3').addClass('incorrecto');
        }
        /////////
        if($('#etiq_3_4').hasClass('5')){
            puntos++;
            $('#etiq_3_4').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_3_4');
            $('#etiq_3_4').addClass('incorrecto');
        }
        /////////
        if($('#etiq_3_5').hasClass('4')){
            puntos++;
            $('#etiq_3_5').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_3_5');
            $('#etiq_3_5').addClass('incorrecto');
        }


        if($('#etiq_3_1').hasClass('correcto') && $('#etiq_3_2').hasClass('correcto') && $('#etiq_3_3').hasClass('correcto') && $('#etiq_3_4').hasClass('correcto') && $('#etiq_3_5').hasClass('correcto')){
            createjs.Sound.registerSound("sonidos/resp_correcta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }        
            }
        else{
            createjs.Sound.registerSound("sonidos/resp_incorrecta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }
        }
    }
    else if(paso== 4){
        if($('#etiq_4_1').hasClass('5')){
            puntos++;
            $('#etiq_4_1').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_4_1');
            $('#etiq_4_1').addClass('incorrecto');
        }
        /////////
        if($('#etiq_4_2').hasClass('4')){
            puntos++;
            $('#etiq_4_2').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_4_2');
            $('#etiq_4_2').addClass('incorrecto');
        }
        /////////
        if($('#etiq_4_3').hasClass('3')){
            puntos++;
            $('#etiq_4_3').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_4_3');
            $('#etiq_4_3').addClass('incorrecto');
        }
        /////////
        if($('#etiq_4_4').hasClass('2')){
            puntos++;
            $('#etiq_4_4').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_4_4');
            $('#etiq_4_4').addClass('incorrecto');
        }
        /////////
        if($('#etiq_4_5').hasClass('1')){
            puntos++;
            $('#etiq_4_5').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_4_5');
            $('#etiq_4_5').addClass('incorrecto');
        }


        if($('#etiq_4_1').hasClass('correcto') && $('#etiq_4_2').hasClass('correcto') && $('#etiq_4_3').hasClass('correcto') && $('#etiq_4_4').hasClass('correcto') && $('#etiq_4_5').hasClass('correcto')){
            createjs.Sound.registerSound("sonidos/resp_correcta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }        
            }
        else{
            createjs.Sound.registerSound("sonidos/resp_incorrecta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }
        }
    }
    else if(paso== 5){
        if($('#etiq_5_1').hasClass('1')){
            puntos++;
            $('#etiq_5_1').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_5_1');
            $('#etiq_5_1').addClass('incorrecto');
        }
        /////////
        if($('#etiq_5_2').hasClass('4')){
            puntos++;
            $('#etiq_5_2').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_5_2');
            $('#etiq_5_2').addClass('incorrecto');
        }
        /////////
        if($('#etiq_5_3').hasClass('2')){
            puntos++;
            $('#etiq_5_3').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_5_3');
            $('#etiq_5_3').addClass('incorrecto');
        }
        /////////
        if($('#etiq_5_4').hasClass('3')){
            puntos++;
            $('#etiq_5_4').addClass('correcto');
        }
        else{
            colocarPosicionInicial('etiq_5_4');
            $('#etiq_5_4').addClass('incorrecto');
        }


        if($('#etiq_5_1').hasClass('correcto') && $('#etiq_5_2').hasClass('correcto') && $('#etiq_5_3').hasClass('correcto') && $('#etiq_5_4').hasClass('correcto')){
            createjs.Sound.registerSound("sonidos/resp_correcta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }        
            }
        else{
            createjs.Sound.registerSound("sonidos/resp_incorrecta.mp3", soundID_2);
            createjs.Sound.addEventListener("fileload", handleFileLoad);
            function handleFileLoad(event) {
              if(event.id=="locucion_2"){
                var instancia = createjs.Sound.play(soundID_2);
                }
              createjs.Sound.removeEventListener("fileload", handleFileLoad);
              }
        }
    }

    $('#puntuacion').html(puntos);
    
    $('#anulador').removeClass("oculto");
    $('#boton_siguiente').removeClass("oculto");
    $('#boton_comprobar').addClass("oculto");
    $('#boton_comprobar_off').addClass("oculto");
}



function siguientePregunta(){
    createjs.Sound.removeAllSounds();

    $('#anulador').addClass("oculto");
    $('#boton_siguiente').addClass('oculto');
    $('#boton_comprobar_off').removeClass("oculto");

    $('#contenido_ejercicio_'+paso).addClass('oculto');
    paso++;
    $('#contenido_ejercicio_'+paso).removeClass('oculto');

    zonaSeleccionada= 0;
    etiquetaSeleccionada= 0;

    if(paso==6){
        finalizarEjercicio();
    }
}



function finalizarEjercicio(){  
    $('#boton_comprobar_off').addClass("oculto");  
    
    $('#capa_anuladora').css("opacity", 1);
    $('#capa_anuladora').addClass("animated fadeIn");
    $('#capa_anuladora').removeClass('oculto');
    
    $('#nota').html(puntos);
    $('#feedback').removeClass('oculto');
    

    /*LMS_Score= puntos;
    LMS_lesson_status= "completed";
    registraDatos();*/
}



