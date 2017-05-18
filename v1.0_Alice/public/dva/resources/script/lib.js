function $_get(id){
  return document.getElementById(id);
}

/*function tecla(e){
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
}*/

function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  var txt;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     txt = this.responseText;
    }
  };
  xhttp.open("GET", url, false);
  xhttp.send(null);
  return txt;
}
