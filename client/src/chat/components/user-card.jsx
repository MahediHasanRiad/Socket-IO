// import emptyImage from '../../asset/empty-profile.png'


function UserCard({ user, selectuser }) {

    return (
        <div onClick={() => selectuser?.(user)} className="flex items-center justify-between p-3 px-4 border-t border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer select-none">
            <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                <img
                    src={'../../asset/empty-profile.png'}
                    alt="{name}'s avatar"
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex flex-col min-w-0">
                    <h4 className="text-[15px] font-bold text-gray-900 truncate leading-tight">
                        {user?.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                        {user?.lastMessage}
                    </p>
                </div>
            </div>
            <span className="text-xs text-gray-400 self-start pt-0.5 flex-shrink-0 ml-2">
                {user?.timestamp}
            </span>
        </div>
    )
}

export default UserCard