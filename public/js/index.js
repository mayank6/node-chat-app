var socket = io();
socket.on('connect',function(){
  alert("Connected");
  socket.emit("createMessage",{
    "from":"mayank",
    "text":"is data passing"
  })
});

socket.on('disconnect',function(){
  alert("disconnected");
});

socket.on('newMessage',function (message) {
  console.log("newmessage",message)
})
