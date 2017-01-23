var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var me;

socket.on('registro', function(data) {
  me = new local('david',data);
  change_opt();
  addMessage("registro",me);
});

socket.on('all', function(data) {
  alert(data);
});

socket.on('server', function(data) {
  if(me.mode=="server")
    alert(data+" remote");
});

function addMessage(type,message) {;
  socket.emit(type, message);
  return false;
}

function exec(){
  var cmd = $('txt').value;
  if(me.mode=="local")
    me.execute(cmd);
  else
    me.send(cmd);
}


function change_opt(){
  var rb = document.getElementsByName('modo');
  var value;
  for(var i=0;i<rb.length;i++){
    if(rb[i].checked)
      value = rb[i].value;
  }
  me.mode =  value;
}

//Class
function local(name,id){
  this.name=name;
  this.id=id;
  this.cmd=[];
}

local.prototype.addcmd = function(cmd){
  this.cmd.push(cmd)
}
local.prototype.send = function(cmd){
  addMessage(this.mode,cmd+" send");
}
local.prototype.execute = function(cmd){
  alert(cmd+" execute");
}
