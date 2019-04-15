var socket = io();
socket.on('connect',function(){
  alert("Connected");

});

socket.on('disconnect',function(){
  alert("disconnected");
});

socket.on('newMessage',function (message) {
  console.log("newmessage",message)
  var p = jQuery("<p></p>");
  p.text(`${message.from}:${message.text} at ${message.createdAt}`)
  jQuery('#message').append(p);
})

// socket.emit('createMessage',{
//   name:"fra",
//   text:"asd",
// },function(data){
//   console.log("acknowledeg",data)
// })

jQuery("#message-form").on("submit",function(event){
  event.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  },function () {

  })

});
