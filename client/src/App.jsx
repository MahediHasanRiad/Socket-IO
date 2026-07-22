import { useState } from "react";
import ChatButtom from "./components/chat-buttom";
import ChatTop from "./components/chat-top";
import UserCard from "./components/user-card";
import { UserData } from "./data/user";

function App() {
  const [user, setUser] = useState(null);

  const getData = (data) => {
    setUser(data);
  };

  return (
    <section className="flex">
      {/* right site -- all users  */}
      <section className="w-[20%] border-r space-y-3">
        {UserData.map((user) => (
          <UserCard key={user.name} user={user} selectuser={getData} />
        ))}
      </section>
      {/* right site chat  */}
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
          {/* Chat messages will render here */}
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

export default App;
