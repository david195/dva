var socket = io.connect('http://192.168.1.72:8080', { 'forceNew': true });
var me=new local();

/*Send*/
window.onload=function(){
  send_opt();
};

function send_opt(){
  var rb = document.getElementsByName('modo');
  var value;
  for(var i=0;i<rb.length;i++){
    if(rb[i].checked)
      value = rb[i].value;
  }
  me.state=value;
  socket.emit("login",value);
}

function send_cmd(){
  if(me.state=="client")
    socket.emit('cmd',$('cmd').value);
  else if (me.state=="local") {
    exec($('cmd').value)
  }
}

/*Recive*/

socket.on('id',function(id){
  me.id = id;
});
socket.on('exec',function(cmd){
  if(me.state=='server')
    exec(cmd);
});

function exec(cmd){
  me.addcmd(cmd);
  alert(cmd);
}

//Class
function local(){
  this.cmd=[];
  this.state="local";
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
