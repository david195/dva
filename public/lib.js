function send_post(url,params,callback){
  var http = new XMLHttpRequest();
  http.open("POST", url, true);
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          callback(http.responseText);
      }
  }
  http.send(params);
}

function send_get(url,params,callback){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       callback(this.responseText);
      }
    };
  xhttp.open("GET", url+params, true);
  xhttp.send();
}

function $(id){return document.getElementById(id);}

function e(){
	n = arguments.length;
	var elemento;
	if(n>0){
		elemento = document.createElement(arguments[0]);
    if(n>1)
      if (Array.isArray(arguments[1])){
        var arg = arguments[1];
        //Atributos
        elemento.innerHTML = arg.innerHTML;
        elemento.value = arg.value;
        elemento.id = arg.id;
        elemento.name = arg.name;
        elemento.class = arg.class;
      }
		for(var i=2;i<n;i++){
			var arg = arguments[i];
			if(typeof(arg)=="string")
				elemento.innerHTML = arg;
			else
				elemento.appendChild(arg);
		}
	}
	return elemento;
}
