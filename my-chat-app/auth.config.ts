import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const session = cookies().get("session")?.value;
            const isOnDashboard = nextUrl.pathname.startsWith('/chat');
            if (isOnDashboard) {
                if (session) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (session) {
                return Response.redirect(new URL('/chat', nextUrl));
            }
            return true;
        },

    },
    providers: [],
    // Add providers with an empty array for now
} satisfies NextAuthConfig;