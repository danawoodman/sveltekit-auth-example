import type { Handle } from "@sveltejs/kit";
import debug from "debug";
import { find_by_token, login } from "$lib/auth";

const log = debug("app:hooks.server");

export const handle: Handle = async ({ event, resolve }) => {
	log("url:", event.url);

	const token = event.cookies.get("auth_token");

	if (token) {
		const user = await find_by_token(event.cookies, token);
		if (user) event.locals.user = user;
	} else event.cookies.delete("auth_token");

	return resolve(event);
};
