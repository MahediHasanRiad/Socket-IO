

interface UserFieldType {
  id: string;
  img: string;
  name: string;
  latestMessage?: string;
  time?: string;
  unreadCount?: number;
  getUserId: (v: string) => void
}

function UserField({ 
  id,
  img, 
  name, 
  latestMessage = "Hey there! I am using WhatsApp.", 
  time = "11:45 AM", 
  unreadCount = 0 ,
  getUserId
}: UserFieldType) {
  return (
    <section className="flex items-center justify-between p-3 hover:bg-[#f0f2f5] cursor-pointer transition-colors duration-200 border-b border-[#e9edef] bg-white" 
    onClick={() => getUserId(id)}>
      {/* Left side: Avatar and Message Details */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Avatar */}
        <img 
          src={img} 
          alt={`${name}'s profile`} 
          className="w-12 h-12 rounded-full object-cover bg-gray-200 flex-shrink-0"
        />
        
        {/* Name and Latest Message */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-[16px] font-normal text-[#111b21] truncate">
            {name}
          </h3>
          <p className="text-[14px] text-[#667781] truncate mt-0.5">
            {latestMessage}
          </p>
        </div>
      </div>

      {/* Right side: Time and Unread Badge */}
      <div className="flex flex-col items-end justify-between h-12 ml-2 flex-shrink-0">
        <span className={`text-[12px] ${unreadCount > 0 ? 'text-[#00a884] font-medium' : 'text-[#667781]'}`}>
          {time}
        </span>
        
        {unreadCount > 0 && (
          <div className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#00a884] text-white text-[12px] font-medium">
            {unreadCount}
          </div>
        )}
      </div>
    </section>
  )
}

export default UserField