var exec = function(x){
  this.x = x;
  this.importScript = function (nombre) {
      var s = document.createElement("script");
      s.src = nombre;
      document.querySelector("head").appendChild(s);
  }
  this.importScript("js/services.js");
  this.importScript("js/lib.js");

  this.exec = function(service,cmd){
    var code = service+"('"+cmd+"')";
    eval(code);
  };

}
