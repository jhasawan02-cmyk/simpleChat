import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
const app = express();
//calling the actuall node server manually to have better controll, usually express does this using app.listen
const server = createServer(app);
//making an instance of the the socket server
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', (socket) => {
    socket.on("room1", (name) => {
        console.log(`${name} joined room1 with user id: ${socket.id}`);
        // //emit  anotice of new joiner to all
        // io.emit("roomNotice",name);
        //broadcasting to evry one other then the joinee
        socket.broadcast.emit("roomNotice", name);
    });
    //broadcasting message to all participants
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
    });
    //typer username notice
    socket.on("typing", (name) => {
        socket.broadcast.emit("typing", name);
    });
});
// //route
// app.get("/", (req, res)=>{
//     res.send("hello, world");
// })
//server listning
const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
    console.log(`server listning at http://localhostport:/${PORT}`);
});
//# sourceMappingURL=index.js.map