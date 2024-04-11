import axios from 'axios';
import {
    Room,
    User
} from './definitions';

import { unstable_noStore as noStore } from 'next/cache';


export async function getChatRoom() {
    noStore()
    try {
        const res = await axios.get<Room[]>(`http://localhost:8000/room`)
        const data = res.data;
        return data
    } catch (error) {
        console.log(error)
    }

}

export async function getInbox(id: string) {
    noStore()
    try {
        const res = await axios.get(`http://localhost:8000/inbox/${id}`)
        const data = res.data.json_data;
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getRoom(id: string) {
    noStore()
    try {
        const res = await axios.get(`http://localhost:8000/room/${id}`)
        const data = res.data;
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getUserInRoom(id: string) {
    noStore()
    try {
        const res = await axios.get(`http://localhost:8000/user/find-in-room/${id}`)
        const data = res.data;
        return data
    } catch (error) {
        console.log(error)
    }
}

// export async function getChatMessege(): Promise<User[]> {
//     noStore()
//     return new Promise<User[]>((resolve, reject) => {
//         setTimeout(async () => {
//             try {
//                 const res = await fetch('http://localhost:8000/chatList');

//                 if (!res.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const data = await res.json();

//                 // Assume data is an array of objects with id and username properties
//                 // Convert data to array of User objects
//                 const userList: User[] = data.map((item: any) => ({
//                     id: item.id,
//                     username: item.username,
//                     img: item.img,
//                     description: item.description
//                     // map other properties as needed...
//                 }));

//                 resolve(userList);
//             } catch (error) {
//                 reject(error);
//             }
//         }, 3000);
//     })
// }



