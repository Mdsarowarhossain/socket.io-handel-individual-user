const io = require("socket.io-client")
var socket=io.connect("http://localhost:3000/")
const userID = 'user124'; // Replace with your user ID
socket.on("connect",()=>{
    socket.emit('storeUserID', userID);
})

socket.on("hi",(d)=>{
    console.log(d);
})