import app from "./app";
var http = require("http").createServer(app);
var io = require("socket.io")(http);

//TODO: colocar isso em outro lugar
io.on("connect", function (socket) {
  console.log(socket.id + " connectado");

  socket.on("transfer_room", function (data) {
    console.log("transferindo para sala" + data);
    socket.join(data);
  });

  socket.on("text", function (data) {
    console.log(
      "Texto: " + data.text + " para " + Object.values(socket.rooms)[1]
    );
    socket.to(Object.values(socket.rooms)[1]).emit("text", data);
  });

  socket.on("disconnect", function () {
    console.log(socket.id + " desconnectado");
  });
});

//require("./routes/api")(app, io);
io.on("chat", function () {
  console.log("teste");
});

http.listen(3333);
