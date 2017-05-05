var socket = io.connect('http://'+IPS+':3000', { 'forceNew': true });
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

function send_cmd(cmd){
  if(me.state=="client")
    socket.emit('cmd',cmd);
  else if (me.state=="local") {
    exec(cmd)
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
  analiza(cmd);
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
