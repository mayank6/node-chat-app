const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("New User is connected!!");
  //send only to one one user who joined
  socket.emit("newMessage",{
    from: "admin",
    text:"Welcome to chatting app",
    createdAt:new Date().getTime()
  });
  //after connection broadcast to other users on same emit listener
  socket.broadcast.emit("newMessage",{
    from:"admin",
    text:"New User is Joined!!",
    createdAt:new Date().getTime()
  });

  socket.on('createMessage',(message)=>{
    console.log("message",message);



    io.emit("newMessage",{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    })
  });

  socket.on('disconnect',()=>{
    console.log("disconnected");
  });
});


app.use(express.static(publicpath));

server.listen(port,()=>{
  console.log(`Server is listening on ${port}`)
})
