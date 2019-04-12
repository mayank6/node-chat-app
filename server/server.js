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

  socket.on('disconnect',()=>{
    console.log("disconnected");
  });
});


app.use(express.static(publicpath));

server.listen(port,()=>{
  console.log(`Server is listening on ${port}`)
})
