const sockets = (socket) => {
  // console.log("A user connected");

  socket.on("send-Message", ({ message, roomId }) => {
    // console.log(
    //   `send-Message event received. Message: ${message}, Room ID: ${roomId}`
    // );
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("receive-Message", { message });
  });

  socket.on("typing-started", ({ roomId }) => {
    // console.log(`typing-started event received. Room ID: ${roomId}`);
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-started-from-server");
  });

  socket.on("typing-stopped", ({ roomId }) => {
    // console.log(`typing-stopped event received. Room ID: ${roomId}`);
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("typing-stopped-from-server");
  });

  socket.on("join-room", ({ roomId }) => {
    // console.log(`join-room event received. Room ID: ${roomId}`);
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
};

export default sockets;
