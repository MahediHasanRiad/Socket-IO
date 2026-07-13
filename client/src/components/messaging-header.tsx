import React from 'react'
import { ArrowLeft, Phone, Video, MoreVertical, Search } from 'lucide-react' // Optional: standard WhatsApp icons

interface MessagingHeaderProps {
  img: string;
  name: string;
  isTyping?: string;
  onBackClick?: () => void; // Useful for mobile layouts
}

function MessagingHeader({ img, name, isTyping = '', onBackClick }: MessagingHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-[#e9edef] select-none">
      <div className="flex items-center gap-3 min-w-0 cursor-pointer">
        {onBackClick && (
          <button onClick={onBackClick} className="md:hidden p-1 rounded-full hover:bg-black/5 text-[#54656f] dark:text-[#aebac1]">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* User Avatar */}
        <div className="relative flex-shrink-0">
          <img 
            src={img} 
            alt={`${name}'s profile`} 
            className="w-10 h-10 rounded-full object-cover bg-gray-200"
          />
        </div>

        {/* Name and Online/Typing Status */}
        <div className="flex flex-col min-w-0">
          <h2 className="text-[16px] font-medium text-[#111b21] truncate leading-tight">
            {name}
          </h2>
          
          {/* Status block with fixed height to prevent content shifting */}
          <div className="h-4 min-w-0">
            {isTyping !== '' ? (
              <span className="text-[13px] text-[#00a884] dark:text-[#00a884] font-medium animate-pulse block truncate">
                typing...
              </span>
            ) : (
              <span className="text-[13px] text-[#667781] dark:text-[#8696a0] block truncate">
                online
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default MessagingHeader