var socket = io();
socket.on('connect',function(){
  alert("Connected");

});

socket.on('disconnect',function(){
  alert("disconnected");
});

socket.on('newMessage',function (message) {
  var p = jQuery("<li></li>");
  p.text(`${message.from}:${message.text} at ${message.createdAt}`)
  jQuery('#message').append(p);
})

// socket.emit('createMessage',{
//   name:"fra",
//   text:"asd",
// },function(data){
//   console.log("acknowledeg",data)
// })
socket.on('newLocationMessage',function (message) {
  var p = jQuery("<li></li>");
  var a =jQuery("<a target='_blank'>MY LOCATION</a>")
  p.text(`${message.from}:`)
  a.attr('href',message.url)
  p.append(a)
  jQuery('#message').append(p);
})
jQuery("#message-form").on("submit",function(event){
  event.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  },function () {

  })

});

var locationButton=jQuery("#location");
locationButton.on("click",function () {
  if (!navigator.geolocation){
    return alert("GEO LOCATION NOT SUPPORTED")
  }
  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('createLocation',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  },function (error){
    alert("Unable to fetch location")
  })
})
