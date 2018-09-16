const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
console.log('new user connected');
// socket.emit('newMessage',{
//    "from":"ankur@gmail.com","text":"ankur is most awesome guy",
//    "createAt":123 
// });
socket.emit('newMessage',{
    from:"Admin",
    text:"Welcome to Chat App"
   
});
socket.broadcast.emit('newMessage',{
    from: "Admin",
    text:"New User joined",
     createAt: new Date().getTime()
})
 socket.on('disconnect',()=>{
        console.log("User was dissconected");
    });
    socket.on('createMessage',(message)=>{
console.log('createdMessage',message);
    io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
    // socket.broadcast.emit('newMessage',{
    //     from:message.from,
    //     text:message.text,
    //     createdAt: new Date().getTime()
    // })
    })
})
server .listen(port,()=>{
    console.log(`port is working on ${port}`);
})
