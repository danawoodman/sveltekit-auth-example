import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import debug from "debug";
import { logout } from "$lib/auth";

const log = debug("app:routes/logout/+page.server");

export const load: PageServerLoad = async (event) => {
	log("logout");

	await logout(event.cookies);

	throw redirect(302, "/");
};
