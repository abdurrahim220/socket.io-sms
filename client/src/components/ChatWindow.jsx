import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useOutletContext, useParams } from "react-router-dom";

const ChatWindow = () => {
  const { socket } = useOutletContext();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const { roomId } = useParams();

  // console.log(socket);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-Message", (data) => {
      setChat((prev) => [...prev, { message: data.message, received: true }]);
    });

    socket.on("typing-started-from-server", () => {
      // console.log("typing from server");
      setTyping(true);
    });
    socket.on("typing-stopped-from-server", () => {
      // console.log("typing from server");
      setTyping(false);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("send-Message", { message, roomId });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage("");
  };

  function handleInput(e) {
    // let timeout;

    setMessage(e.target.value);
    socket.emit("typing-started", { roomId });

    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped");
      }, 1000)
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          padding: 4,
          marginTop: 5,
          width: "60%",
          backgroundColor: "gray",
        }}
      >
        {roomId && <Typography>{roomId}</Typography>}
        <Box sx={{ marginBottom: 5, marginTop: 5 }}>
          {chat.map((msg, idx) => (
            <Typography
              sx={{ textAlign: msg.received ? "left" : "right" }}
              key={idx}
            >
              {msg.message}
            </Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {typing && (
            <InputLabel sx={{ color: "white" }} shrink htmlFor="message-input">
              Type...
            </InputLabel>
          )}

          <OutlinedInput
            sx={{
              backgroundColor: "white",
            }}
            fullWidth
            id="message-input"
            value={message}
            placeholder="Write your message"
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ChatWindow;
