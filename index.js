var express = require('express');
var session = require('express-session');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require("path");
var cors = require('cors');
cors = require('cors');

var nodes=[];
var cmds=[];
var ids=0;

app.use(express.static('public'));
//app.use(session({secret: 'ssshhhhh'}));

/*Sockets*/

io.on('connection', function(socket) {
  nodes.push(socket);
  socket.on('login',function(data){login(data,socket)});
  socket.on('cmd',function(data){cmd(data)});
});

function cmd(data){
  console.log(data);
  io.sockets.emit('exec',data);
}

function login(data,socket){
  console.log(data);
}

app.get("/alice",function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
  res.sendFile(path.join(__dirname+'/public/alice/index.html'));
});

app.get("/debug",function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
//  res.sendFile(path.join(__dirname+'/public/face/index.html'));

  var request = require('request');

  //Step 1 - Set the headers
  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }

  //Step 2 - Configure the request
  var options = {
      url     : 'http://localhost:8080/alice?q='+req.query.q,
      method  : 'GET',
      jar     : true,
      headers : headers
  }

  //Step 3 - do the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          //console.log(body);
          res.send(body);
      }
  });

});

server.listen(3000, function() {
  console.log("Servidor corriendo en http://192.168.0.99:3000");
});
