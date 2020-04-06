const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

const Server = app.listen(process.env.PORT || 3000);
const io = socket(Server);

io.on("connection", function (socket) {
    socket.on("message", function (data) {
        io.sockets.emit("message", data);
    });
    socket.on("typing", function (user) {
        socket.broadcast.emit("typing", user);
    });
    socket.on("connected", function (user) {
        socket.broadcast.emit("connected", user);
    });
});