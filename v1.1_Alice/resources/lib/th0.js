var five = require('johnny-five');
var EtherPortClient = require("etherport-client").EtherPortClient;

var humidityFloor=0.0
var ambient_temperature = 0;
var id = 'th0';
function init(boards){
        var msg = 'starting th0';
        console.log(msg);
        boards[id] = new five.Board({
                port: new EtherPortClient({
                  host: "192.168.43.102",  // IP ESP8266
                  port: 3030
                }),
                timeout: 10000,
                repl: false
        });
        boards[id].on('ready', function(){      
                var msg = 'ready: '+id + ' : '+"192.168.43.102";
                console.log(msg)
                //Sensor de humedad de suelo
                this.analogRead(0, function(voltage) {
                        var umb = 950;
                        humidityFloor = 1-((voltage-umb)/(1024-umb));
                        if(humidityFloor<0) humidityFloor = 0;
                        if(humidityFloor>1) humidityFloor = 1;
                });
                /*/Sensor de humedad ambiental
                var thermometer = new five.Thermometer({
                        controller: "DHT11_I2C_NANO_BACKPACK"
                });
                thermometer.on('chage', function(){
                        ambient_temperature = this;
                        console.log(this)
                });*/
        });

        boards[id].on('disconect',function(){
                console.log('disconect')
        })

}

function getTemperature(){
        var msg = 'la temperatura actual es de 10 grados centígrados';
        return msg;
}

function getHumidityFloor(){
        var h = humidityFloor * 100;
        var msg = 'la humedad del suelo es del ' + h.toFixed(1) + " porciento";
        return msg;
}

module.exports.init = init;
module.exports.getTemperature = getTemperature; 
module.exports.getHumidityFloor = getHumidityFloor;