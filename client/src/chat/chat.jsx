import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "./components/user-card";
import ChatTop from "./components/chat-top";
import { io } from "socket.io-client";
import ChatButtom from "./components/chat-buttom";

function Chat() {
  const [allUser, setAllUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState();

  const { user: loginUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchInitialUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/all-user`,
        );
        setAllUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialUser();
  }, []);

  const getData = (selectedUser) => {
    setUser(selectedUser);
  };

  // ------------- socket/io start --------------------

  let socket = useRef(null);

  useEffect(() => {
    if (!loginUser.token) return;

    socket.current = io("http://localhost:3000", {
      auth: {
        token: loginUser.token,
      },
    });

    socket.current.on("connect", (socket) => {
      console.log("socket connected", socket.id);
    });

    // receive brodcast message
    const handleMessage = (incommingMsg) => {
      setMessages((prev) => [incommingMsg, ...prev]);
    };
    socket.current.on("new_message", handleMessage);

    // Remove listener when unmounting / re-running effect
    return () => {
      socket.current.off("new_message", handleMessage);
      socket.current.disconnect();
    };
  }, [loginUser.token]);

  // ------------------- send message start -----------------------

  const sendMessage = (e) => {
    e.preventDefault();
    if (!user || !input?.trim()) return;

    const MsgUniqueId = crypto.randomUUID();

    // Clean payload for backend emission
    const payload = {
      id: MsgUniqueId,
      receiverId: user.id,
      content: input,
    };

    // Full object for local React UI
    const localMessage = {
      ...payload,
      senderId: loginUser.data.id,
      createdAt: new Date().toISOString(),
    };

    if (socket.current) {
      socket.current.emit("send_message", payload);
    }

    // Update UI state
    setMessages((prev) => [...prev, localMessage]);

    setInput("");
  };

  // ------------------- send message end -----------------------

  // ------------- socket/io end --------------------

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading chat...
      </div>
    );
  }

  const getMessage = (message) => {
    setInput(message);
  };

  return (
    <section className="flex">
      {/* Left side -- all users */}
      <section className="w-[20%] border-r space-y-3">
        {allUser?.users?.map((u) => (
          <UserCard key={u.name} user={u} selectuser={getData} />
        ))}
      </section>

      {/* Right side -- chat */}
      <section className="w-[80%] h-screen flex flex-col bg-[#efeae2]">
        {/* Top Header - Fixed height */}
        <header className="flex-shrink-0">
          <ChatTop
            img={user?.avatarUrl}
            name={user?.name}
            status={user?.status || "Last seen today at 11:00 AM"}
          />
        </header>

        {/* Middle Scrollable Messages Area */}
        <main className="flex-1 overflow-y-auto p-4 space-y-3">
          {user ? (
            <div className="flex flex-col items-center my-2 space-y-3 w-full">
              {/* Date Badge */}
              <span className="bg-white/80 text-gray-600 text-xs px-3 py-1 rounded-md shadow-sm">
                TODAY
              </span>

              {/* Messages Container */}
              <div className="flex flex-col space-y-2 w-full">
                {messages?.map((msg, index) => {
                  const currentUserId = loginUser?.data?.id || loginUser?.id;
                  const isMe = msg.senderId === currentUserId;

                  return (
                    <div
                      key={msg.id || msg.clientMsgId || index}
                      className={`p-3 rounded-lg shadow-sm max-w-[70%] text-sm text-gray-800 ${
                        isMe
                          ? "self-end bg-[#d9fdd3]" // Green bubble right side
                          : "self-start bg-white" // White bubble left side
                      }`}
                    >
                      {msg.content}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              Select a chat to start messaging
            </div>
          )}
        </main>

        {/* Bottom Input Area - Fixed height at bottom */}
        <footer className="flex-shrink-0">
          <ChatButtom
            getMessage={getMessage}
            sendMessageHandler={sendMessage}
            sendMessage={input}
          />
        </footer>
      </section>
    </section>
  );
}

export default Chat;
