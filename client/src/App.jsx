import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";

import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  return (
    <>
      <div>hello Socket</div>
      <Button variant="text">Text</Button>
    </>
  );
}

export default App;
