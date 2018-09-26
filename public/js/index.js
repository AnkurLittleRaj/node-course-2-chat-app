  var socket =io();
    socket.on('connect',function () {
        console.log("connected to server");

    //     socket.emit('createMessage', {
    //    from:"nscjnjdsjn@kk",
    //    text:"hi there my name is dug"

    //     })
    });
     socket.on('disconnect',function (){
        console.log("Disconnected to server");
    });
    socket.on('newMessage',function (message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
        console.log("New message",message);
        var li = jQuery('<li></li>');
        li.text(`${message.from} ${formattedTime}:${message.text}`);
        jQuery('#messages').append(li);
    
    });
    socket.on('newLocationMessage',function(message){
        var formattedTime = moment(message.createdAt).format('h:mm a');
         var li = jQuery('<li></li>');
         var a = jQuery('<a target="_blank">My current Location</a>');
         li.text(`${message.from}  ${formattedTime}:`);
         a.attr('href',message.url);
         li.append(a);
         jQuery('#messages').append(li);
    })
    // socket.emit('createMessage',{
    //     from:"Ankur",
    //     text:"Hello there watsup"
    // },function (mess){
    //     console.log('got it',mess)
    // });
    jQuery('#message-form').on('submit',function(e){
        e.preventDefault();
        socket.emit('createMessage',{
            from:"User",
            text:jQuery('[name=message]').val()
        },function(){
        jQuery('[name=message]').val('')
        });
    });
    var positionButton = jQuery('#send-location');
    positionButton.on('click',function(){
if(!navigator.geolocation){
return alert('geolocation is not supported in your browser');
}
positionButton.attr('disabled','disabled').text('Sending Location.... ');
navigator.geolocation.getCurrentPosition(function(position){
    positionButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
    })
    
    console.log(position);
}, function(){
     positionButton.removeAttr('disabled').text('Send location');
    alert('unable to fetch location');
})
    })