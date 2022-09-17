import { auth } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";
import debug from "debug";

const log = debug("app:hooks.server");

export const handle: Handle = async ({ event, resolve }) => {
	// Grab the auth_token from the cookies for non-API request:
	const cookie_token = event.cookies.get("auth_token") as string;

	// Grab the `Authorization: Bearer <token>` header for API requests:
	const bearer_token = event.request.headers
		.get("Authorization")
		?.split(" ")[1];
	const token = cookie_token ?? bearer_token;

	log("token:", token);

	if (token) {
		const resp = await auth.validate_session({
			token,
			opts: { cookies: event.cookies },
		});

		log("resp:", resp);

		if (resp.isOk()) {
			event.locals.user = resp.value;
		} else {
			// TODO: show error to user?
			console.error("Error validating session:", resp.error);
		}
	}

	return resolve(event);
};
