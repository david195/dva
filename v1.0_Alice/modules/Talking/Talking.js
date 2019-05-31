const sc = document.createElement('script');
sc.src = 'https://code.responsivevoice.org/responsivevoice.js';
document.getElementsByTagName('head')[0].appendChild(sc);

var Talking = new Talking("Bertha");

function init(){
  Talking.listen(Talking.say);
}

function Talking(name){
  this.recognition;
  this.recognizing = false;
  this.language = 'Spanish Female';
  this.Vname = name;

  if (!('webkitSpeechRecognition' in window)) {
    alert("¡API no soportada!");
  } else {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = "es-VE";
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.onstart = function() {
      this.recognizing = true;
      console.log("empezando a escuchar");
    }
    this.recognition.onresult = function(event) {
     for (var i = event.resultIndex; i < event.results.length; i++) {
      if(event.results[i].isFinal){
        var texto = event.results[i][0].transcript;
        if(texto[0]==" ")
          texto = texto.slice(1);
        this.callback(texto);
      }
     }

      //texto
    }
    this.recognition.onerror = function(event) {
      //alert('Hay los wacho');
    }
    this.recognition.onend = function() {
      this.recognizing = false;
      console.log("terminó de escuchar, llegó a su fin");
    }
  }

  this.listen = function(callback){
    if(this.recognizing==false){
      this.recognizing=true;
      this.callback = callback;
      this.recognition.start();
    }
    else {
      this.recognizing=false;
      this.callback = null;
      this.recognition.stop();
    }
  }

  this.say = function(text){
    responsiveVoice.speak(text,'Spanish Female');
  }

}
