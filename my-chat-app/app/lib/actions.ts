'use server';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from "jose";
import axios from 'axios';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';


const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(key);
}

export async function getSessionData() {
    noStore()
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function createRoomChat(formData: object, id: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.post('http://localhost:8000/room', formData);
        // Handle the response
        await createInbox(id)
        console.log(response.data)
        console.log('Form submitted successfully');

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }
    redirect(`/chat/${id}`)

}

async function createInbox(id: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.post('http://localhost:8000/inbox', { id });
        // Handle the response
        console.log(response.data)
        console.log('Form submitted successfully');

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }

}

export async function deleteRoomChat(id: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.delete(`http://localhost:8000/room/${id}`);
        await deleteInbox(id)
        // Handle the response
        console.log(response.data)
        console.log('Form submitted successfully');

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }
    redirect(`/chat`)

}

export async function updateInbox(id: string, json: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.put(`http://localhost:8000/inbox/${id}`, { json });
        // Handle the response
        console.log(response.data)
        console.log('Form submitted successfully');

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }

}

async function deleteInbox(id: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.delete(`http://localhost:8000/inbox/${id}`);

        // Handle the response
        console.log(response.data)
        console.log('Form submitted successfully');

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }
}

export async function logOut() {
    cookies().delete("session");
    await signOut();
}

export async function updateStatus(status: number, userid: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.put(`http://localhost:8000/user/status/${userid}`, { status });
        // Handle the response
        console.log(response.data)

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }
}

export async function addUserToRoom(roomid: string, userid: string) {
    try {
        // Make a POST request using Axios
        const response = await axios.post('http://localhost:8000/user/add-to-room', { roomid, userid });
        // Handle the response
        console.log(response.data)
        console.log('Form submitted successfully');

    } catch (error) {
        // Handle errors
        console.error('Failed to submit form:', error);
    }

}

export async function getRoomMember(roomid: string, userid: string) {
    try {
        const res = await axios.get(`http://localhost:8000/user/room-member?roomid=${roomid}&userid=${userid}`)
        const data = res.data;
        return data
    } catch (error) {
        console.log(error)
    }
}





