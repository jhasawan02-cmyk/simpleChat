import {Server} from "socket.io";
import express from "express";
import { createServer } from "node:http";

const app = express();

//calling the actuall node server manually to have better controll, usually express does this using app.listen
const server = createServer(app);

//making an instance of the the socket server
const io = new Server(server);

io.on('connection',(socket)=>{
    console.log(`user connected: ${socket.id}`);
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
