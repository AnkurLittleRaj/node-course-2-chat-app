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
    
    });