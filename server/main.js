var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

var clients=[];
var cmd=[];

io.on('connection', function(socket) {
  var i = clients.length;
  socket.emit('registro', i);
  socket.on('registro', function(data) {
    clients.push(data);
    console.log("new -> "+data);
  });
  socket.on('all', function(data) {
    cmd.push(data);
    console.log("all -> "+data);
    io.sockets.emit('all',data);
  });
  socket.on('client', function(data) {
    cmd.push(data);
    console.log("client -> "+data);
    io.sockets.emit('server',data);
  });
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});
