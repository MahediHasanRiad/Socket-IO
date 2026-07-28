import { useState, useEffect } from "react";
import ChatButtom from "./components/chat-buttom";
import ChatTop from "./components/chat-top";
import UserCard from "./components/user-card";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

function Chat() {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const {user: loginUser} = useSelector((state) => state.auth)

  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(socket.id);
  });

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading chat...
      </div>
    );
  }

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
            <div className="flex justify-center my-2">
              <span className="bg-white/80 text-gray-600 text-xs px-3 py-1 rounded-md shadow-sm">
                TODAY
              </span>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-sm">
              Select a chat to start messaging
            </div>
          )}
        </main>

        {/* Bottom Input Area - Fixed height at bottom */}
        <footer className="flex-shrink-0">
          <ChatButtom />
        </footer>
      </section>
    </section>
  );
}

export default Chat;
