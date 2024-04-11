import { getRoom } from "../lib/data"
import Search from "./search"





export default async function Header({ params }: { params: { id: string } }) {
    const room = await getRoom(params.id)
    return (
        <header className="bg-indigo-500 p-4 flex items-center h-16 justify-between">
            <div className="flex items-center">
                <div className="bg-gray-300 rounded-full mr-3">
                    <img src={room.img} alt="User Avatar" className="w-12 h-12 rounded-full" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">{room.roomname}</h3>
            </div>

            <Search />

        </header>
    )
}
