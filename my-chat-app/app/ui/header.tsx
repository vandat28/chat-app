import Image from "next/image";
import { signOut } from '@/auth';
import { cookies } from "next/headers";



export default function Header() {


    return (
        <header className="bg-indigo-600 p-4 text-gray-700 flex justify-between">
            <Image
                className="relative"
                src="/chat-alt-outline-filled.png"
                alt="Next.js Logo"
                width={40}
                height={40}
                priority
            />
            <form className="" action={async () => {
                'use server';
                cookies().delete("session");
                await signOut();
            }}>
                <button className="h-[40px] w-full grow  gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>
        </header>
    )
}
