'use client'
import ChatList from './chat-list';
import { Suspense, useEffect, useState } from 'react';
import Loading from "../ui/loading/loading";
import { usePathname } from 'next/navigation';
import CreateRoomForm from './create-room-form';
import { getChatRoom } from '../lib/data';
import { Room } from '../lib/definitions';



export default function SideBar({ user }: { user: any }) {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([])
    useEffect(() => {
        getDataChatRoom()
    }, [])

    const getDataChatRoom = async () => {
        const rooms = await getChatRoom() ?? []
        setRooms(rooms)
    }
    return (
        <div className="flex flex-col w-1/4 bg-white border-r border-gray-300">
            <header className="p-2 border-b border-gray-300 flex justify-between items-center bg-white-600 text-white">
                <div className="">
                    <button type="button" id="menuButton" className="focus:outline-none" onClick={() => setShowModal(true)}>
                        <div
                            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            <span className="hidden md:block">Create chat room</span>
                        </div>
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                        <img src={`${user.user.img}&amp;font=Lato`} alt="User Avatar" className="w-12 h-12 rounded-full" />

                    </div>
                    <span className="text-blue-400 hidden md:block">{user.user.username}</span>
                </div>
            </header>
            <ChatList user={user.user} rooms={rooms} pathname={pathname} getDataChatRoom={getDataChatRoom} />
            {/* <Search /> */}
            {showModal && <CreateRoomForm user={user.user} setShowModal={setShowModal} getDataChatRoom={getDataChatRoom} />}
        </div>
    )
}
