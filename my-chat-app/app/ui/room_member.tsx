

import { HiOutlineStatusOffline } from "react-icons/hi";
import { RiRadioButtonLine } from "react-icons/ri";
import { addUserToRoom, getRoomMember } from "../lib/actions";
import { getUserInRoom } from "../lib/data";


export default async function RoomMember({ params, user }: { params: { id: string }, user: any }) {
    const roomId = params.id;

    let roomMember = await getRoomMember(roomId, user.id)
    if (!roomMember) {
        await addUserToRoom(roomId, user.id)
    }
    let userInRoom = await getUserInRoom(roomId)
    let onlineUser = userInRoom.filter((item: any) => item.status === 1);
    let offlineUser = userInRoom.filter((item: any) => item.status === 0);


    return (
        <div className="w-1/4 bg-indigo-100 overflow-y-auto h-full">
            <div className="p-2 m-2 ">
                <div className="flex justify-between items-center text-green-500">
                    <p className="text-lg font-medium ">Trực tuyến</p>
                    <RiRadioButtonLine />
                </div>
                <div className="my-2">
                    {onlineUser && onlineUser.map((item: any, index: number) => (
                        <div key={index} className="flex p-2 items-center hover:bg-indigo-300 cursor-pointer rounded-lg">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3">
                                <img src={`${item.img}&amp;font=Lato`} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            </div>
                            <span className="hidden md:block text-small text-black font-medium">{item.username}</span>
                        </div>
                    ))}

                </div>
            </div>
            <div className="p-2 m-2 ">
                <div className="flex justify-between items-center text-gray-900">
                    <p className="text-lg font-medium">Ngoại tuyến</p>
                    <HiOutlineStatusOffline />
                </div>
                <div className="my-2">
                    {offlineUser && offlineUser.map((item: any, index: number) => (
                        <div key={index} className="flex p-2 items-center hover:bg-indigo-300 hover:opacity-100 cursor-pointer rounded-lg opacity-40 ">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3">
                                <img src={`${item.img}&amp;font=Lato`} alt="User Avatar" className="w-8 h-8 rounded-full" />
                            </div>
                            <span className="hidden md:block text-small text-black font-medium">{item.username}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
