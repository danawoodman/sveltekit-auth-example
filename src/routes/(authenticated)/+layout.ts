import { redirect } from "@sveltejs/kit";
import debug from "debug";
import type { LayoutServerLoadEvent } from "./$types";

const log = debug("app:routes:(authenticated):layout");

export async function load(event: LayoutServerLoadEvent) {
	const parent_user = (await event.parent())?.user;
	const locals_user = event.locals?.user;

	log("parent_user:", parent_user);
	log("locals_user:", locals_user);

	const user = locals_user || parent_user;

	log("user:", user);

	if (!user) {
		log("no user, redirecting to /login");
		throw redirect(301, "/login");
	}
	return { user };
}
