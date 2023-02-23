const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected" + "socket.id:" + socket.id);

  //ルームに入るときのソケット設定
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`ユーザー:${socket.id}が${data}に参加しました`);
  });

  //チャット専用ソケット設定
  socket.on("send_message", (data) => {
    console.log(data);

    //クライアントに返すソケット通信(room番号が同じ人のみ)
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected" + "socket.id:" + socket.id);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
