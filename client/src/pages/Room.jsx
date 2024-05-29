import React, { useEffect } from "react";

import { useOutletContext, useParams } from "react-router-dom";

import { io } from "socket.io-client";
import ChatWindow from "../components/ChatWindow";
import { Box, Typography } from "@mui/material";

const Room = () => {
  const params = useParams();

  const { socket } = useOutletContext();
  //   console.log(params);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", { roomId: params.roomId });
  }, [params, socket]);

  return (
    <Box>
      
      <ChatWindow />;
    </Box>
  );
};

export default Room;
  