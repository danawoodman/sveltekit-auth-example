import { find_by_token } from "$lib/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// Grab the auth_token from the cookies for non-API request:
	const cookie_token = event.cookies.get("auth_token") as string;
	// Grab the `Authorization: Bearer <token>` header for API requests:
	const bearer_token = event.request.headers
		.get("Authorization")
		?.split(" ")[1];
	const token = cookie_token ?? bearer_token;

	if (token) {
		const user = await find_by_token(event.cookies, token);
		if (user) event.locals.user = user;
	}

	return resolve(event);
};
