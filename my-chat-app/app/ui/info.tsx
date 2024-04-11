'use client'
import { IoSettings } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { logOut, updateStatus } from "../lib/actions";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa";

export default function Info({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const handleLogout = async () => {
        await updateStatus(0, user.id)
        await logOut()
    }
    const handleOpenDropDown = () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    return (
        <div className='flex bg-slate-200 relative'>
            <div className="flex p-2 m-2 items-center hover:bg-slate-400 cursor-pointer w-1/2 rounded-lg" onClick={handleOpenDropDown}>
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3">
                    <img src={`${user.img}&amp;font=Lato`} alt="User Avatar" className="w-8 h-8 rounded-full" />
                </div>
                <span className="hidden md:block text-lg text-black-600 font-semibold">{user.username}</span>
            </div>
            <div className="flex m-2 justify-end w-1/2 items-center">
                <div className="text-xl hover:bg-slate-400 rounded-lg cursor-pointer ">
                    <FaMicrophoneAlt className="hover:animate-spin w-full h-full p-2" />
                </div>
                <div className="text-xl  hover:bg-slate-400 rounded-lg cursor-pointer">
                    <FaHeadphones className="hover:animate-spin w-full h-full p-2" />
                </div>
                <div className="text-xl  hover:bg-slate-400 rounded-lg cursor-pointer ">
                    <IoSettings className="hover:animate-spin w-full h-full p-2" />
                </div>
            </div>
            {isOpen && <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute bottom-12 left-12">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center justify-between">
                            Your profile <FaUserAstronaut /></a>
                    </li>
                    <li>
                        <a href='#' className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center justify-between"
                            onClick={handleLogout}
                        >Sign out  <FaPowerOff /> </a>
                    </li>
                </ul>
            </div>}

        </div>
    )
}
