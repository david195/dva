//const msg = 'DVA \nDomotic Virtual Assistant\nDavid Ruiz García';
const msg = 'DVA \nDomotic Virtual Assistant\n';
console.log(msg); 

var debug = true;
//var debug = false;
var express = require('express');

var app = require("https-localhost")
var http = require('http') .Server (app)

var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));

var devices,dataJS;
var boards={};

var fs = require('fs') 

fs.readFile('resources/data.json', 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
        dataJS = JSON.parse(data);
    }
});

initAll();

function initAll(){
    devices = {'porro':require('./resources/lib/porro.js')
    //'rele4':require('./resources/lib/rele4.js'),
    //'th0':require('./resources/lib/th0.js')
    }
    var object = devices;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            element.init(boards);     
        }
    }
}

app.get('/', function(req, res){
    console.log(req)
    res.sendFile( __dirname + '/public/index.html');
});

app.get('/login', function(req, res){
    res.sendFile( __dirname + '/public/login.html');
});

app.get('/add_cmd/:id_cmd-:device-:id-:exec-:args', function(req, res){
    var args = [];
    if(req.params.args != '') args = [req.params.args]
    var obj = {
        device:req.params.device,
        id:req.params.id,
        exec:req.params.exec,
        args: args
    }
    dataJS.order[req.params.id_cmd.toString()] = obj;
    console.log('Comando agregado correctamente')
    res.send('<h2>Comando agregado correctamente</h2>');
});

io.on('connection', function(socket){
    io.emit('init',dataJS);

    socket.on('cmd',function(process){
        console.log(process)
        var des = devices[process.id][process.exec](process.args);
        console.log(des);
        var result = {description:des}
        io.emit('execution', result);
    });

    socket.on('disconnect', function(){
    });
});


http.listen(8080, function(){
    console.log('Server en puerto 8080')
});

//app.listen()
