import type { Metadata } from "next";
import SideBar from "../ui/side-bar";

import { getSessionData } from "../lib/actions";
import Header from "../ui/header";


export const metadata: Metadata = {
    title: "Chat App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getSessionData()
    return (
        <body className="flex h-screen overflow-hidden">
            <SideBar user={user} />
            <div className="flex flex-col w-3/4">
                {children}
            </div>
        </body>
    );
}