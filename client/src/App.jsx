import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { dummyUsers } from "./user-data";
import UserField from "./components/user-field";
import MessagingHeader from "./components/messaging-header";

function App() {
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState();
  const [user, setUser] = useState(null)
  const [chatMessages, setChatMessages] = useState(null)

  const socket = io("http://localhost:3000");

  const sendHandler = () => {
    console.log(message);
  };

  useEffect(() => {
    // get data
    socket.on("connect", () => {
      console.log("frontend connected", getUserId);
    });

    // received messages from another user
    socket.on('privet-message', (data) => {
      console.log('received messages', data)

      setChatMessages((prev) => [...prev, data])
    })

    return (
      socket.off('connect'),
      socket.off('privet-message')
    )
    
  }, []);


  const handleSend = () => {

    // message format
    const sendMessage = {
      toUser: socketId,
      fromUser: dummyUsers[0].id,
      message: message,
      self: true
    }
    console.log(sendMessage)

    // send message a user
    socket.emit('privet-message', sendMessage)
  }

  const getUserId = (id) => {
    console.log('user id', id)
    setSocketId(id)

    const filterData = dummyUsers.filter(user => user.id === id)
    setUser(filterData[0])
  }

  return (
    <section className="grid grid-cols-6 p-6 w-[70%] mx-auto">
      {/* users list  */}
      <section className="col-span-2 border-r border-gray-200 min-h-screen p-2">
        <button className="w-full border border-gray-300 rounded-md p-2">
          New Group
        </button>
        {/* groups  */}
        <div className="my-8">
          <span className="text-sx text-gray-400 mt-8">Groups</span>
          <span className=""> </span>
        </div>
        {/* user  */}
        <div className="my-8">
          <span className="text-sx text-gray-400">users</span>
          {dummyUsers.map((user) => (
            <UserField key={user.id} id={user.id} img={user.image} name={user.name} getUserId={getUserId}/>
          ))}
        </div>
      </section>
      {/* messages / chatting  */}
      <section className="col-span-4">
        <div className="min-h-210">
          <MessagingHeader img={user?.image} name={user?.name} isTyping={message} />

          {/* Display Chat Messages */}
          <div className="p-4 space-y-2 h-[50vh] overflow-y-auto bg-gray-50 border-b">
            {chatMessages?.filter(msg => msg.fromUser === user?.socketId || msg.toUser === user?.socketId)
              .map((msg, index) => (
                <div key={index} className={`p-2 rounded max-w-xs ${msg.self ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 mr-auto"}`}>
                  {msg.message}
                </div>
            ))}
          </div>
        </div>
         <div className="flex">
           <input type="text" placeholder="typing..." className="w-[90%] rounded-lg mx-4 border border-gray-300 p-4" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="bg-blue-600 text-white px-4 rounded-lg cursor-pointer" onClick={handleSend}>Send</button>
         </div>
      </section>
    </section>
  );
}

export default App;
