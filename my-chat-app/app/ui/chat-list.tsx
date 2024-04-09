
import { Room } from "../lib/definitions"
import clsx from "clsx";
import Link from "next/link";
import { Delete } from "./deleteButton";

export default function ChatList({ user, pathname, rooms, getDataChatRoom }: { pathname: string, rooms: Room[], getDataChatRoom: any, user: any }) {

    return (
        <div className="overflow-y-auto h-screen p-3">
            {rooms && rooms.map((item) => (
                <div className="mb-6">
                    <Link href={`/chat/${item.id}`} key={item.id}
                        className={clsx(
                            'flex items-center mb-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md',
                            {
                                'bg-sky-200 text-blue-600 hover:bg-sky-200': pathname === `/chat/${item.id}`,
                            },
                        )}
                    >
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img src={item.img} alt="User Avatar" className="w-12 h-12 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg text-gray-600 font-semibold">{item.roomname}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </Link>
                    {item.userid == user.id ?
                        <Delete id={item.id} getDataChatRoom={getDataChatRoom} /> :
                        <div className="p-2 text-lg text-blue-400 font-semibold">Chủ phòng: {item.username}</div>}
                </div>


            ))}
        </div>
    )
}
