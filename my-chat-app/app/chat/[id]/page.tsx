import { getSessionData } from "@/app/lib/actions";
import ChatContent from "@/app/ui/chat-content";
import Header from "@/app/ui/header";
import Loading from "@/app/ui/loading/loading";
import RoomMember from "@/app/ui/room_member";
import { Suspense } from 'react';


export default async function Page({ params }: { params: { id: string } }) {
    const user = await getSessionData()
    return (
        <>
            <Header params={params} />
            <div className="flex h-screen">
                <div className="flex flex-col w-3/4 h-screen">
                    <Suspense fallback={<Loading />}>
                        <ChatContent params={params} user={user.user} />
                    </Suspense>
                </div>
                <Suspense fallback={<Loading />}>
                    <RoomMember params={params} user={user.user} />
                </Suspense>
            </div>
        </>

    );
}
