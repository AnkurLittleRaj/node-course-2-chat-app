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
socket.emit('newMessage',{
   "from":"ankur@gmail.com","text":"ankur is most awesome guy",
   "createAt":123 
});
 socket.on('disconnect',()=>{
        console.log("User was dissconected");
    });
    socket.on('createMessage',(newEmail)=>{
console.log('createdMessage',newEmail);
    })
})
server .listen(port,()=>{
    console.log(`port is working on ${port}`);
})
