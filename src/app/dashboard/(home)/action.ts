"use server";

import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResult } from "../(auth)/signin/form/action";

// export async function logout(): Promise<ActionResult> {
export async function logout(): Promise<void> {

    const { session } = await getUser();
    const cookieStore = await cookies();

    if (!session) {
        redirect("/dashboard/signin");
        return; // Tidak perlu kembali dengan ActionResult
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return redirect("/dashboard/signin");
}