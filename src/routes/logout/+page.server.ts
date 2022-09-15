import { logout } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	await logout(event.cookies);

	throw redirect(302, "/");
};
