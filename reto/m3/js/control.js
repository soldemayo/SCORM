
$(document).ready(function(){
    iniciaSCORM();
});



// devuelve el objeto API object (or null if not found)
function findAPI(win)  {
  
  if (typeof(win.API) != 'undefined' && win.API != null)  return win.API;
  else  if (win.frames.length > 0)  for (var i = 0 ; i < win.frames.length ; i++)  {
          var winFrameApi = win.frames[i].API;
          if (typeof(winFrameApi) !=  'undefined' && win != win.opener && winFrameApi != null)  return win.frames[i].API;
        }
  if (typeof(win.parent) != 'undefined' && win.parent != null && win.parent != win)  return findAPI(win.parent);
  return null;
}


//Inicializar las variables

var LMS_Suspend_data="";
var LMS_lesson_status= "incomplete";
var LMS_tiempo_sesion;
var LMS_Score=0;

var hora_inicial;
var hora_inicial_int;
var hora_final;
var hora_final_int;
var eval_total=0;
var fecha_int;
var LMS_tiempo_int;
var fecha = new Date();
hora_inicial= fecha.getTime();

// busca el API
status = 'Buscando API';
var status_scorm = 0;
if (typeof(API) == 'undefined') API = null;
function mm_getAPI()  {
  API = findAPI(window);
  if (API == null && typeof(window.opener) != 'undefined' && window.opener != null)  API = findAPI(window.opener);
  if (API != null) {
    status = 'API encontrada';
    status_scorm= 1;
  } else  {
    status = 'No se pudo encontrar API';
    //alert('No se ha podido encontrar adaptador de SCORM');
  }
}
mm_getAPI();


function DateGet(){
   var d, s = "";           
   d = new Date();                           
   s += (d.getMonth() + 1) + "/";           
   s += d.getDate() + "/";                   
   s += d.getYear();                         
   return(s);                              
}
var fechaActual= DateGet();

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// VARIABLES CURSO


var timeOut;    // variable para hacer setTimeOut
var tiempo;     // variable para hacer SetInterval

///////////////////////////////////////////////////////////////////////////////

function iniciaSCORM(){
	console.log("status_scorm: "+status_scorm);
	
	if (status_scorm == 1) {
		API.LMSInitialize("");
		LMS_lesson_status = API.LMSGetValue("cmi.core.lesson_status");

		if(LMS_lesson_status != "not attempted"){
			LMS_Score = API.LMSGetValue("cmi.core.score.raw");
		}
		else{
			API.LMSSetValue("cmi.core.lesson_status" , "incomplete");
			API.LMSSetValue("cmi.core.score.raw" , ""+ LMS_Score +"");
			API.LMSCommit("");
		}
	}
	else{
		//si no es SCORM
		LMS_lesson_status = "NOSCORM";
	}
}




//////////////////////////////////////////////////////////////////////////////////////
function registraDatos(){
	if (status_scorm == 1){
	
		////Grabo Session Time
		//////////////////////////////////////////////////////////////////////////////

		var fecha2 = new Date();
		hora_final= fecha2.getTime();
		var tiempo = new Date(hora_final-hora_inicial);


		//formateo fecha
		var LMS_tiempo_minutos;
		var LMS_tiempo_segundos;
		LMS_tiempo_sesion = (tiempo.getHours()-1).toString();
		if(LMS_tiempo_sesion.length==1){LMS_tiempo_sesion="0"+LMS_tiempo_sesion;}
	
		LMS_tiempo_minutos = tiempo.getMinutes().toString();
		if(LMS_tiempo_minutos.length==1){LMS_tiempo_minutos="0"+LMS_tiempo_minutos;}

		LMS_tiempo_segundos = tiempo.getSeconds().toString();

		if(LMS_tiempo_segundos.length==1){LMS_tiempo_segundos="0"+LMS_tiempo_segundos;}

		LMS_tiempo_sesion += ":" + LMS_tiempo_minutos + ":" + LMS_tiempo_segundos;
			

		API.LMSSetValue("cmi.core.lesson_status" , ""+ LMS_lesson_status +"");
		API.LMSSetValue("cmi.core.session_time" , ""+ LMS_tiempo_sesion +"");
		
		var LMS_Score_Actual = API.LMSGetValue("cmi.core.score.raw");
		if(LMS_Score > LMS_Score_Actual){
			API.LMSSetValue("cmi.core.score.raw" , ""+ LMS_Score +"");
		}
		
		API.LMSCommit("");
	}

}


///////////////////////////////////////////////////////////////////////////////////////
		

function SalirSCO(){
	registraDatos();
	SCO_Close();
}
	

////////////////////////////////////////////////////////////////

function SCO_Close(){
	API.LMSFinish("");
	window.close();
	top.close();
}



