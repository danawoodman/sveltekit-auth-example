import { auth } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get("auth_token") as string;
	await auth.logout({
		token,
		opts: { cookies: event.cookies },
	});
	event.cookies.delete("auth_token");
	throw redirect(302, "/");
};
