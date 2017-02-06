var recognition;
var recognizing = false;
var Vname = 'Alice';

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
        send_cmd(texto.slice(Vname.length+1));
      }
      $_get("texto").value = texto.slice(Vname.length+1);
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
  //window.open("https://www.google.com.mx/search?q="+texto);
  $_get('texto').value = cmd;
  var search = String(cmd.split(" ")[0]);
  var url = '';
  switch (search) {
    case "Google":
      url= 'https://www.google.com.mx/search?q='+cmd.slice(7).split(" ").join("%20");
      window.open(url);
      break;
    case "YouTube":
      url= cmd.slice(8);
      youtube(url);
      break;
    case "Wikipedia":
      url= 'https://es.wikipedia.org/wiki/'+cmd.slice(10);
      wikipedia(cmd.slice(10));
      break;
    case "home":
      alert("home execute: "+cmd.slice(5));
      break;
    case "cállate":
      responsiveVoice.cancel();
      break;
    default:
      break;
  }
}

function youtube(id){
  //$('youtube').src = "http://www.youtube.com/embed/?enablejsapi=1&version=3&listType=search&list="+id;
  $_get('youtube').style.display = 'block';
  $_get('web').style.display = 'none';
  switch (id) {
    case "reproducir":
      player.playVideo();
      break;
    case "para":
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
