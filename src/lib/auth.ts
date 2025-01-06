import { PrismaAdapter } from "@lucia-auth/adapter-prisma"; // 1.3k (gzipped: 571)
import prisma from "../../lib/prisma";

import { Lucia, Session, User } from "lucia"; // 7.8k (gzipped: 2.5k)
import { RoleUser } from "@prisma/client"; // 40.8k (gzipped: 15.2k)

import { cache } from "react"; // 4.1k (gzipped: 1.8k)
import { cookies } from "next/headers"; // 16.7k (gzipped: 4.4k)

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            name: attributes.name,
            role: attributes.role,
            email: attributes.email,
            passport: attributes.passport,
        };
    },
});

export const getUser = cache(async (): Promise<{ user: User, session: Session } | { user: null, session: null }> => {
    const cookieStore = await cookies(); // Tunggu sampai Promise selesai
    const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    }
    const result = await lucia.validateSession(sessionId);
    try {

        if (result.session && result.session?.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

    } catch (error) {
        console.error('Error validating session:', error);
    }

    return result;
});

declare module 'lucia' {
    interface Register {
        lucia: typeof Lucia;
        DatabaseUserAttributes: {
            name: string;
            email: string;
            role: RoleUser;
            passport: string | null;
        };
    }
}