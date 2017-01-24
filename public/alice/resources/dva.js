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
    console.log("empezando a eschucar");
  }
  recognition.onresult = function(event) {

   for (var i = event.resultIndex; i < event.results.length; i++) {
    if(event.results[i].isFinal){
      texto = event.results[i][0].transcript;
      if(texto[0]==" ")
        texto = texto.slice(1);
      document.getElementById("texto").value = texto;
      cName = texto.split(" ")[0];
      if(cName==Vname & texto.slice(Vname.length+1)!="")
        analiza(texto.slice(Vname.length+1));
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
      alert(loadDoc('script/rb.php?cmd='+cmd.slice(5)));
      break;
    default:
      return;
      break
  }
}

function youtube(id){
  $('youtube').src = "http://www.youtube.com/embed/?enablejsapi=1&version=3&listType=search&list="+id;
}

function wikipedia(title){
  var contenido = loadDoc("script/server.php?wikipedia="+title);
  responsiveVoice.speak(contenido,'Spanish Female');
  var url = 'https://es.wikipedia.org/wiki/'+title;
  $('web').src = url;
}

function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  var txt;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     txt = this.responseText;
    }
  };
  xhttp.open("GET", url, false);
  xhttp.send();
  return txt;
}

function $(id){
  return document.getElementById(id);
}

function tecla(e){
  var keyCode;
  if(window.event)keyCode=window.event.keyCode;
  else if(e) keyCode=e.which;
  switch (keyCode) {
    case 101:
      procesar();
      break;
    case 99:
      responsiveVoice.cancel();
      break;
    default:

  }
}
