import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const port = 4000;
import path from "path";
import { dirname, join } from 'node:path';

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Connection is ready!!");
});
 


app.get("/", (req, res) => {
  //   res.send("Hello World");
  res.sendFile(path.join(__dirname, "index.html"));
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
