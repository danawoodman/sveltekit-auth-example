import { redirect } from "@sveltejs/kit";
import type { PageLoadEvent } from "./$types";
import debug from "debug";

const log = debug("app:routes:login:page.ts");

export async function load(event: PageLoadEvent) {
	const { user } = await event.parent();
	log("user:", user);
	if (user) {
		log("redirecting to /dashboard");
		throw redirect(303, "/dashboard");
	}
}
