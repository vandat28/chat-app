import { getSessionData } from "@/app/lib/actions";
import ChatContent from "@/app/ui/chat-content";
import Loading from "@/app/ui/loading/loading";
import { Suspense } from 'react';


export default async function Page({ params }: { params: { id: string } }) {
    const user = await getSessionData()

    return (
        <>
            <Suspense fallback={<Loading />}>
                <ChatContent params={params} user={user.user} />
            </Suspense>
        </>

    );
}
