import type { LayoutServerLoadEvent } from "./$types";
import debug from "debug";

const log = debug("app:routes:+layout.server.ts");

export async function load(event: LayoutServerLoadEvent) {
	const user = event.locals?.user;
	log("user:", user);
	if (!user) return { user: null };
	delete user.token;
	return { user };
}
