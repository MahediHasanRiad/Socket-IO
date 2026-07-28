import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function Chat() {
  const { user: loginUser } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 1. Only connect if user is logged in
    if (!loginUser) return;

    // 2. Initialize socket connection
    const newSocket = io("http://localhost:3000", {
      auth: {
        userId: loginUser?._id, // Pass user info to backend socket handshake
      },
    });

    // 3. Register event listeners inside useEffect
    newSocket.on("connect", () => {
      console.log("Connected with socket ID:", newSocket.id);
    });

    // Save socket instance to state if you need to use it in event handlers (e.g. sending messages)
    setSocket(newSocket);

    // 4. CLEANUP: Disconnect socket when component unmounts or loginUser changes
    return () => {
      newSocket.off("connect");
      newSocket.disconnect();
    };
  }, [loginUser?._id]); // Re-run if logged-in user changes

  const sendMessage = (text) => {
    if (socket) {
      socket.emit("send_message", { senderId: loginUser._id, text });
    }
  };

  return (
    <div>
      {/* Your chat UI */}
    </div>
  );
}

export default Chat;