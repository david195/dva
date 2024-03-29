var recognition;
var recognizing = false;
var Vname = 'Alice';
var yes;

var IPS = "192.168.1.72";

var texto="";

//Speach Recognition

if (!('webkitSpeechRecognition' in window)) {
  alert("¡API no soportada!");
} else {

  recognition = new webkitSpeechRecognition();
  recognition.lang = "es-VE";
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    console.log("empezando a escuchar");
  }
  recognition.onresult = function(event) {

   for (var i = event.resultIndex; i < event.results.length; i++) {
    if(event.results[i].isFinal){
      texto = event.results[i][0].transcript;
      if(texto[0]==" ")
        texto = texto.slice(1);
      cName = texto.split(" ")[0];
      if(cName==Vname & texto.slice(Vname.length+1)!=""){
        $_get("texto").value = texto.slice(Vname.length+1);
        send_cmd(texto.slice(Vname.length+1));
      }
    }
  }

    //texto
  }
  recognition.onerror = function(event) {
    //alert('Hay los wacho');
  }
  recognition.onend = function() {
    recognizing = false;
    document.getElementById("procesar").innerHTML = "Escuchar";
    console.log("terminó de eschucar, llegó a su fin");
  }

}

//Manager Functions

function procesar() {
  if (recognizing == false) {
    recognition.start();
    recognizing = true;
    document.getElementById("procesar").innerHTML = "Detener";
    document.getElementById("texto").value ='';
  } else {
    recognition.stop();
    recognizing = false;
    document.getElementById("procesar").innerHTML = "Escuchar";
  }
}

function analiza(cmd){
  alice(cmd.toLowerCase(),function(res){
    var fun = res.split(" ")[0];
    var arg = res.slice(fun.length);
    var call = fun+"('"+arg.replace(" ","")+"')";
    if(res=="ERROR"){
      add_cmd(cmd);
    }
    else
      eval(call);
    $_get('texto').value = res;

  });
}

function alice(cmd,callback){
  send_http("http://"+IPS+":3000/debug?q="+cmd,callback);
}

function send_http(url,callback){
  $.get(
    url,
    {paramOne : 1, paramX : 'abc'},
    function(data) {
       callback(data);
    }
  );
}

function add_cmd(cmd){
    //var say = "comando no encontrado, ¿deseas asociar un comando existente?"
    //responsiveVoice.speak(say,'Spanish Female');
    //alert("simon");
    //send_http("http://"+IPS+":3000/debug?add="+cmd+"&cmd=youtube",alert);
}

/*Funciones cmd*/
function youtube(id){
  //$('youtube').src = "http://www.youtube.com/embed/?enablejsapi=1&version=3&listType=search&list="+id;
  $_get('youtube').style.display = 'block';
  $_get('web').style.display = 'none';
  switch (id) {
    case "reproducir":
      player.playVideo();
      break;
    case "detener":
      player.stopVideo();
      break;
    case "pausa":
      player.pauseVideo();
      break;
    case "siguiente":
      player.nextVideo();
      break;
    case "anterior":
      player.previousVideo();
      break;
    default:
      player.loadPlaylist({list:id,listType:"search"});
      break;
  }
}

function wikipedia(title){
  //responsiveVoice.speak(contenido,'Spanish Female');
  var url = 'https://es.wikipedia.org/wiki/'+title;
  $_get('youtube').style.display = 'none';
  $_get('web').style.display = 'block';
  $_get('web').src = url;
  wiki(title,responsiveVoice.speak);
}


function wiki(title,callback){
  title = title.replace(" ","%20")
  $.ajax({
      type: "GET",
      url: "https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+title+"&callback=?",
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
          var x = data['query']['pages'];
          for (var a  in x) {
            callback(x[a]['extract'],'Spanish Female');
          }
      },
      error: function (errorMessage) {
      }
  });
}

function google(q){
  url= 'https://www.google.com.mx/search?q='+q;
  window.open(url);
}


function prueba(){
  var cmd = document.getElementById('texto').value;
  send_cmd(cmd);
}
