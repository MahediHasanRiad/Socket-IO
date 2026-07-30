import { Image, Send } from 'lucide-react';



function ChatButtom({getMessage, sendMessageHandler, sendMessage}) {
  return (
    <div className="relative w-full mx-auto flex flex-col justify-end pb-2 font-sans overflow-hidden">
  

  <div className="flex-1 bg-gradient-to-b from-gray-200/50 via-gray-100 to-gray-200/60 p-4">
    <div className="flex justify-end mb-2">
      <div className="bg-white rounded-2xl rounded-tr-sm px-3 py-1.5 shadow-sm text-xs text-gray-500 flex items-center gap-2">
        <span>...</span>
        <span className="text-[10px] text-gray-400">03.44</span>
      </div>
    </div>
  </div>


  <div className="px-3 py-2 backdrop-blur-md flex items-center gap-2">
    
    <div className="relative flex-1 flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
      <input 
        type="text" 
        placeholder="" 
        className="w-full bg-transparent text-sm text-gray-800 focus:outline-none pr-6"
        value={sendMessage}
        onChange={(e) => getMessage(e.target.value)}
      />
    </div>

    <button type="button" className="cursor-pointer p-1.5 text-gray-800 hover:text-black transition-colors flex-shrink-0">
       <Image />
    </button>

    <button onClick={sendMessageHandler} type="button" className="cursor-pointer p-1.5 text-gray-800 hover:text-black transition-colors flex-shrink-0">
      <Send />
    </button>
  </div>

</div>
  )
}

export default ChatButtom