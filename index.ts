import {Server} from "socket.io";
import express from "express";
import { createServer } from "node:http";

const app = express();

//calling the actuall node server manually to have better controll, usually express does this using app.listen
const server = createServer(app);

//making an instance of the the socket server
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

io.on('connection',(socket)=>{
    

    socket.on("room1", (name) => {
    console.log(`${name} joined room1 with user id: ${socket.id}`);
  });
})

// //route
// app.get("/", (req, res)=>{
//     res.send("hello, world");
// })








//server listning
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`server listning at http://localhostport:/${PORT}`);
});
