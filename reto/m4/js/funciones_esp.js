
var escala= 1;
var altura= $(window).height();
var anchura= $(window).width();
var altoCurso= 700;
var anchoCurso= 1200;
var proporcionAlto= (altura/altoCurso).toFixed(2);
var proporcionAncho= (anchura/anchoCurso).toFixed(2);

var soundID_1 = "locucion_1";
var soundID_2 = "locucion_2";



var resultados= [0,0,0,0,0,0]; // el cero es no realizada, el 1 es acertada
var puntos= 0;
var segundos= 60;
var segundosTotal= 180;
var tiempo;
var prefijo= "02:";
var porcentaje;
var aciertos= 0;


$(document).ready(inicializarEventos);



function inicializarEventos(){
    redimensionarContenido();
    $(window).resize(function() {
      redimensionarContenido();
    });

    $('.boton_idiomas').click(seleccionarIdioma);

    $('#boton_comenzar').bind("click touchstart", comenzarEjercicio);
    $('#boton_cerrar').click(abrirConfirmacion);
    $('#boton_confirmacion_si').click(SalirSCO);
    $('#boton_confirmacion_no').click(cerrarConfirmacion);
    

    $(".form-control").each(function() {
        $(this).val("");
    });
    //$(".form-control").change(comprobarPalabra);
    $(".form-control").keyup(function() {
        comprobarPalabras();
    }).keyup();


    // 37=izquierda,  38=arriba, 39=derecha, 40=abajo //
    $('input, select').keydown(function(e) {
        console.log(e.keyCode)
        if (e.keyCode==37) { 
            if($(this).attr('id')=="letra_2_6"){ $("#letra_5_4").focus(); }
            else if($(this).attr('id')=="letra_4_6"){ $("#letra_5_5").focus(); }
            else if($(this).attr('id')=="letra_5_1"){ $("#letra_1_2").focus(); }
            else if($(this).attr('id')=="letra_5_5"){ $("#letra_2_6").focus(); }
            else if($(this).attr('id')=="letra_3_1"){ $("#letra_2_3").focus(); }
            else{ $(this).closest('div').prev().find('input').focus(); }
        }
        else if (e.keyCode==38) { 
            if($(this).attr('id')=="letra_3_2"){ $("#letra_4_3").focus(); }
            else if($(this).attr('id')=="letra_4_4"){ $("#letra_3_2").focus(); }
            else{ $(this).closest('div').prev().find('input').focus(); }
        }
        else if (e.keyCode==39) { 
            if($(this).attr('id')=="letra_1_2"){ $("#letra_5_1").focus(); }
            else if($(this).attr('id')=="letra_2_6"){ $("#letra_5_5").focus(); }
            else if($(this).attr('id')=="letra_2_3"){ $("#letra_3_1").focus(); }
            else if($(this).attr('id')=="letra_3_2"){ $("#letra_3_3").focus(); }
            else if($(this).attr('id')=="letra_5_4"){ $("#letra_2_6").focus(); }
            else if($(this).attr('id')=="letra_5_5"){ $("#letra_4_6").focus(); }
            else{ $(this).closest('div').next().find('input').focus(); }
        }
        else if (e.keyCode==40) { 
            if($(this).attr('id')=="letra_3_2"){ $("#letra_4_4").focus(); }
            else if($(this).attr('id')=="letra_4_3"){ $("#letra_3_2").focus(); }
            else{ $(this).closest('div').next().find('input').focus(); }
        }
        
    });
}


/***************    REDIMENSIONAR CONTENIDO    *****************/

function redimensionarContenido() {
    altura= $(window).height();
    anchura= $(window).width();

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


/***************    IDIOMA    *****************/

function seleccionarIdioma(){
    var idioma= $(this).attr('id');
    $('#seleccion_idioma').addClass('oculto');

    if(idioma!="esp"){
      $('#contenedor').load(idioma+'.html');
    }
    $('#contenido').removeClass('oculto');
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
    $("#letra_1_1").focus();

    tiempo = setInterval(controlTiempo, 1000);
}


function controlTiempo() {
    segundos--;
    segundosTotal--;

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



function comprobarPalabras(){
    createjs.Sound.removeAllSounds();

    if(resultados[1]==0){ comprobarPalabra_1(); }
    if(resultados[2]==0){ comprobarPalabra_2(); }
    if(resultados[3]==0){ comprobarPalabra_3(); }
    if(resultados[4]==0){ comprobarPalabra_4(); }
    if(resultados[5]==0){ comprobarPalabra_5(); }
}




function comprobarPalabra_1(){
    var palabraCompleta= true;

    for (var i=1; i < 4; i++) {
        if($('#letra_1_'+i).val()==""){
            palabraCompleta= false;
            break;
        }
    };

    if(palabraCompleta){
        if($('#letra_1_1').val().toUpperCase()=="V" && $('#letra_1_2').val().toUpperCase()=="P" && $('#letra_1_3').val().toUpperCase()=="N"){
            resultados[1]= 1;
            puntos= puntos+4;
            $('#puntuacion').html(puntos);

            for (var i=1; i < 4; i++) {
                $('#letra_1_'+i).removeClass('incorrecto');
                $('#letra_1_'+i).addClass('correcto');
                $('#letra_1_'+i).attr('disabled', true);
            }

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
        else if(!$('#letra_1_1').hasClass('incorrecto')){
            for (var i=1; i < 4; i++) {
                $('#letra_1_'+i).addClass('incorrecto');
            }
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
    else{
        /*for (var i=1; i < 4; i++) {
            $('#letra_1_'+i).removeClass('incorrecto');
        }*/
    }
}



function comprobarPalabra_2(){
    var palabraCompleta= true;

    for (var i=1; i < 13; i++) {
        if($('#letra_2_'+i).val()==""){
            palabraCompleta= false;
            break;
        }
    };

    if(palabraCompleta){
        if($('#letra_2_1').val().toUpperCase()=="C" && $('#letra_2_2').val().toUpperCase()=="O" && $('#letra_2_3').val().toUpperCase()=="N" && $('#letra_2_4').val().toUpperCase()=="F" && $('#letra_2_5').val().toUpperCase()=="I" && $('#letra_2_6').val().toUpperCase()=="D" && $('#letra_2_7').val().toUpperCase()=="E" && $('#letra_2_8').val().toUpperCase()=="N" && $('#letra_2_9').val().toUpperCase()=="C" && $('#letra_2_10').val().toUpperCase()=="I" && $('#letra_2_11').val().toUpperCase()=="A" && $('#letra_2_12').val().toUpperCase()=="L"){
            resultados[2]= 1;
            puntos= puntos+4;
            $('#puntuacion').html(puntos);

            for (var i=1; i < 13; i++) {
                $('#letra_2_'+i).removeClass('incorrecto');
                $('#letra_2_'+i).addClass('correcto');
                $('#letra_2_'+i).attr('disabled', true);
            }

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
        else if(!$('#letra_2_1').hasClass('incorrecto')){
            for (var i=1; i < 13; i++) {
                $('#letra_2_'+i).addClass('incorrecto');
            }
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
    else{
        /*for (var i=1; i < 13; i++) {
            $('#letra_2_'+i).removeClass('incorrecto');
        }*/
    }
}


function comprobarPalabra_3(){
    var palabraCompleta= true;

    if($('#letra_2_3').val()==""){ palabraCompleta= false; }
    for (var i=1; i < 9; i++) {
        if($('#letra_3_'+i).val()==""){
            palabraCompleta= false;
            break;
        }
    };
    

    if(palabraCompleta){
        if($('#letra_2_3').val().toUpperCase()=="N" && $('#letra_3_1').val().toUpperCase()=="O" && $('#letra_3_2').val().toUpperCase()=="T" && $('#letra_3_3').val().toUpperCase()=="I" && $('#letra_3_4').val().toUpperCase()=="F" && $('#letra_3_5').val().toUpperCase()=="I" && $('#letra_3_6').val().toUpperCase()=="C" && $('#letra_3_7').val().toUpperCase()=="A" && $('#letra_3_8').val().toUpperCase()=="R"){
            resultados[3]= 1;
            puntos= puntos+4;
            $('#puntuacion').html(puntos);

            $('#letra_2_3').removeClass('incorrecto');
            $('#letra_2_3').addClass('correcto');
            $('#letra_2_3').attr('disabled', true);
            for (var i=1; i < 9; i++) {
                $('#letra_3_'+i).removeClass('incorrecto');
                $('#letra_3_'+i).addClass('correcto');
                $('#letra_3_'+i).attr('disabled', true);
            }

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
        else if(!$('#letra_3_1').hasClass('incorrecto')){
            $('#letra_2_3').addClass('incorrecto');
            for (var i=1; i < 9; i++) {
                $('#letra_3_'+i).addClass('incorrecto');
            }
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
    else{
        /*$('#letra_2_3').removeClass('incorrecto');
        for (var i=1; i < 9; i++) {
            $('#letra_3_'+i).removeClass('incorrecto');
        }*/
    }
}


function comprobarPalabra_4(){
    var palabraCompleta= true;

    if($('#letra_3_2').val()==""){ palabraCompleta= false; }
    for (var i=1; i < 10; i++) {
        if($('#letra_4_'+i).val()==""){
            palabraCompleta= false;
            break;
        }
    };
    

    if(palabraCompleta){
        if($('#letra_4_1').val().toUpperCase()=="C" && $('#letra_4_2').val().toUpperCase()=="O" && $('#letra_4_3').val().toUpperCase()=="N" && $('#letra_3_2').val().toUpperCase()=="T" && $('#letra_4_4').val().toUpperCase()=="R" && $('#letra_4_5').val().toUpperCase()=="A" && $('#letra_4_6').val().toUpperCase()=="S" && $('#letra_4_7').val().toUpperCase()=="E" && $('#letra_4_8').val().toUpperCase()=="Ñ" && $('#letra_4_9').val().toUpperCase()=="A"){
            resultados[4]= 1;
            puntos= puntos+4;
            $('#puntuacion').html(puntos);

            $('#letra_3_2').removeClass('incorrecto');
            $('#letra_3_2').addClass('correcto');
            $('#letra_3_2').attr('disabled', true);
            for (var i=1; i < 10; i++) {
                $('#letra_4_'+i).removeClass('incorrecto');
                $('#letra_4_'+i).addClass('correcto');
                $('#letra_4_'+i).attr('disabled', true);
            }

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
        else if(!$('#letra_4_1').hasClass('incorrecto')){
            $('#letra_3_2').addClass('incorrecto');
            for (var i=1; i < 10; i++) {
                $('#letra_4_'+i).addClass('incorrecto');
            }
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
    else{
       /* $('#letra_3_2').removeClass('incorrecto');
        for (var i=1; i < 10; i++) {
            $('#letra_4_'+i).removeClass('incorrecto');
        }*/
    }
}



function comprobarPalabra_5(){
    var palabraCompleta= true;

    if($('#letra_1_2').val()==""){ palabraCompleta= false; }
    if($('#letra_2_6').val()==""){ palabraCompleta= false; }
    if($('#letra_4_6').val()==""){ palabraCompleta= false; }
    for (var i=1; i < 6; i++) {
        if($('#letra_5_'+i).val()==""){
            palabraCompleta= false;
            break;
        }
    };
    

    if(palabraCompleta){
        if($('#letra_1_2').val().toUpperCase()=="P" && $('#letra_5_1').val().toUpperCase()=="R" && $('#letra_5_2').val().toUpperCase()=="I" && $('#letra_5_3').val().toUpperCase()=="V" && $('#letra_5_4').val().toUpperCase()=="A" && $('#letra_2_6').val().toUpperCase()=="D" && $('#letra_5_5').val().toUpperCase()=="A" && $('#letra_4_6').val().toUpperCase()=="S"){
            resultados[5]= 1;
            puntos= puntos+4;
            $('#puntuacion').html(puntos);

            $('#letra_1_2').removeClass('incorrecto');
            $('#letra_1_2').addClass('correcto');
            $('#letra_1_2').attr('disabled', true);
            $('#letra_2_6').removeClass('incorrecto');
            $('#letra_2_6').addClass('correcto');
            $('#letra_2_6').attr('disabled', true);
            $('#letra_4_6').removeClass('incorrecto');
            $('#letra_4_6').addClass('correcto');
            $('#letra_4_6').attr('disabled', true);
            for (var i=1; i < 6; i++) {
                $('#letra_5_'+i).removeClass('incorrecto');
                $('#letra_5_'+i).addClass('correcto');
                $('#letra_5_'+i).attr('disabled', true);
            }

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
        else if(!$('#letra_5_1').hasClass('incorrecto')){
            $('#letra_1_2').addClass('incorrecto');
            $('#letra_2_6').addClass('incorrecto');
            $('#letra_4_6').addClass('incorrecto');
            for (var i=1; i < 6; i++) {
                $('#letra_5_'+i).addClass('incorrecto');
            }
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
    else{
       /* $('#letra_1_2').removeClass('incorrecto');
        $('#letra_2_6').removeClass('incorrecto');
        $('#letra_4_6').removeClass('incorrecto');
        for (var i=1; i < 6; i++) {
            $('#letra_5_'+i).removeClass('incorrecto');
        }*/
    }
}

function comprobarFin(){
    if(resultados[1]==1 && resultados[2]==1 && resultados[3]==1 && resultados[4]==1 && resultados[5]==1){
        clearInterval(tiempo);
        finalizarEjercicio();
    }
}



function finalizarEjercicio(){
    $(".form-control").each(function() {
        $(this).attr('disabled', true);
    });
    
    $('#capa_anuladora').css("opacity", 1);
    $('#capa_anuladora').removeClass('oculto');
    
    $('#nota').html(puntos);
    $('#feedback').removeClass('oculto');
    

    LMS_Score= puntos;
    LMS_lesson_status= "completed";
    registraDatos();
}



