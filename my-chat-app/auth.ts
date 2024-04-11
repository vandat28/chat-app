import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import axios from 'axios';
import { encrypt, updateStatus } from './app/lib/actions';
import { cookies } from "next/headers";

async function getUser(id: string) {
    try {
        const user = await axios.get<User>(`http://localhost:8000/user/${id}`);
        const data = user.data;
        return data;
    } catch (error) {
        console.log('bbbbbbbbbb', error)
    }
}


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ id: z.string().min(2), password: z.string().min(2) })
                .safeParse(credentials);
            if (parsedCredentials.success) {
                const { id, password } = parsedCredentials.data;
                console.log("running")
                const user = await getUser(id);
                console.log('User:', user)
                if (!user) {
                    console.log("Don't have user")
                    return null;
                }
                if (user.password == password) {
                    await updateStatus(1, user.id)
                    const session = await encrypt({ user });
                    // Save the session in a cookie
                    cookies().set("session", session, { httpOnly: true });
                    return user
                }
            }

            console.log('Invalid credentials');
            return null;
        },
    }),],
});