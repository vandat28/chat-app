'use client'
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button } from "@mui/material";
import { updateInbox } from '../lib/actions';
import { getInbox } from '../lib/data';


export default function ChatContent({ params, user }: { params: { id: string }, user: any }) {
    const roomId = params.id;
    const [message, setMessage] = useState('')
    const [inbox, setInbox] = useState<any>([])
    const [socket, setSocket] = useState<any>('')


    useEffect(() => {
        getDataInbox()
        const socket = io('http://localhost:8080');
        socket.emit("joinRoom", roomId)
        socket.on("message", (message: string) => {
            const messageDetail = JSON.parse(message)
            console.log(messageDetail)
            setInbox((prevInbox: object[]) => [...prevInbox, messageDetail]);

        })
        setSocket(socket)
        return () => {
            socket.disconnect();
        };
    }, [])
    const chatContainerRef = useRef<any>(null);

    // Cuộn xuống dưới khi có tin nhắn mới
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }

        // localStorage.setItem(`${roomId}`, JSON.stringify(inbox));
        if (inbox.length > 0) {
            updateInbox(roomId, JSON.stringify(inbox))
        }
    }, [inbox]);


    const getDataInbox = async () => {
        const oldInbox = await getInbox(params.id) ?? []
        console.log("inbox data", oldInbox)
        setInbox(oldInbox)
    }


    const sendMessage = (event: any) => {
        event.preventDefault();
        if (message != '') {
            socket.emit("message", `{"id": "${user.id}","img": "${user.img}", "message": "${message}"}`, roomId)
            setMessage('')
        }

    }
    return (
        <>
            <div className="h-screen overflow-y-auto p-4 bg-indigo-200 border-t border-gray-300" ref={chatContainerRef}>
                {inbox && inbox.map((element: any, index: number) => (
                    <div key={index}>
                        {element.id === user.id ? (
                            <div className="flex justify-end mb-4">

                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                    <p>{element.message}</p>
                                </div>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                    <img src={`${element.img}&amp;font=Lato`} alt="My Avatar" className="w-8 h-8 rounded-full" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex mb-4">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <img src={`${element.img}&amp;font=Lato`} alt="User Avatar" className="w-8 h-8 rounded-full" />
                                </div>
                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                    <p className="text-gray-700">{element.message}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div >
            <form onSubmit={sendMessage} className="bg-white border-t border-gray-300 p-4 bottom-0 flex-1">
                <div className="flex items-center">
                    <input value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 text-gray-600 mr-3" />
                    <Button type='submit' variant="contained">Send</Button>
                </div>
            </form>
        </>

    );
}
