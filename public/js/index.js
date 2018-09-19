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
        console.log("New message",message);
        var li = jQuery('<li></li>');
        li.text(`${message.from}:${message.text}`);
        jQuery('#messages').append(li);
    
    });
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

        });
    })