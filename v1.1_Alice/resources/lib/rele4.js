var five = require('johnny-five');
var EtherPortClient = require("etherport-client").EtherPortClient;
var id='rele4'
var relays;
function init(boards){
        boards[id] = new five.Board({
                port: new EtherPortClient({
                  host: "192.168.43.101",  // IP ESP8266
                  port: 3030
                }),
                timeout: 10000,
                repl: false
        });
        boards[id].on('ready', function(){   
                relays = new five.Relays([16,5,4,0]);     
                var msg = 'iniciando '+id;
                console.log(msg)
        });
}


function on(args){
        var n=parseInt(args[0])
        relays[n-1].off();
        return "Encendiendo rele "+n 
}

function off(args){
        var n=parseInt(args[0])
        relays[n-1].on();
        return "Apagando rele "+n 
}

module.exports.init = init;
module.exports.on = on; 
module.exports.off = off; 