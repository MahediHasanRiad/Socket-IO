


function ChatTop({ img, name, status }) {
    return (
        <div className="bg-[#005c4b] text-white px-4 py-2.5 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3 min-w-0">
                <button type="button" className="text-white hover:opacity-80 transition-opacity flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="relative flex-shrink-0">
                    <img
                        src={img}
                        alt="{name}'s profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col min-w-0">
                    <h3 className="text-base font-semibold text-white leading-snug truncate">
                        {name}
                    </h3>
                    <p className="text-xs text-emerald-100/80 leading-none truncate mt-0.5">
                        {status}
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-4 text-white flex-shrink-0">
                <button type="button" className="hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
                <button type="button" className="hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ChatTop