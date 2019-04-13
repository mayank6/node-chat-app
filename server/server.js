const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message.js');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log("New User is connected!!");
  //send only to one one user who joined
  socket.emit("newMessage",generateMessage('Admin',"Welcome To chat app!!"));
  //after connection broadcast to other users on same emit listener
  socket.broadcast.emit("newMessage",generateMessage('Admin',"New User Joined"));

  socket.on('createMessage',(message)=>{
    console.log("message",message);



    io.emit("newMessage",generateMessage(message.from,message.text))
  });

  socket.on('disconnect',()=>{
    console.log("disconnected");
  });
});


app.use(express.static(publicpath));

server.listen(port,()=>{
  console.log(`Server is listening on ${port}`)
})
