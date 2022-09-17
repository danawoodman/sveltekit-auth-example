import { auth } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
	const token = event.cookies.get("auth_token") as string;
	await auth.logout({
		token,
		opts: { cookies: event.cookies },
	});
	event.cookies.delete("auth_token");
	throw redirect(302, "/");
}
