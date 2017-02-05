var express = require('express');
var session = require('express-session');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require("path");
var nodes=[];
var cmds=[];
var ids=0;

app.use(express.static('public'));
app.use(session({secret: 'ssshhhhh'}));

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
  res.sendFile(path.join(__dirname+'/public/alice/index.html'));
});

app.get("/debug",function(req,res){
  res.sendFile(path.join(__dirname+'/public/alice/prueba.html'));
});

app.get("/yt",function(req,res){
  res.sendFile(path.join(__dirname+'/public/alice/yt.html'));
});
server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});
