var Latitude = 0;
var Longitude = 0;

var appid = "fb74489502e2ec744aa77a0d52627139";


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        return("Geolocation is not supported by this browser.");
    }
}

function setPosition(position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    getWeather(Latitude,Longitude);
}

function getWeather(lat,lon){
  var params = "?lat="+lat+"&lon="+lon+"&appid="+appid;
  var url = "http://api.openweathermap.org/data/2.5/weather";
  var result = JSON.parse(loadDoc(url+params));
  //var result = loadDoc(url+params);
  //return(result);
  result = "Bienvenido. Mi nombre es "+Vname+". El clima en "+result['name']+" es "+result['weather'][0]['main']+", ¿en que te puedo ayudar?";
  responsiveVoice.speak(result,'Spanish Female');
}
