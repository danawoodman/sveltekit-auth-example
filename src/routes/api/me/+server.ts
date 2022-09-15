import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = (event) => {
	/**
	 * NOTE: You may want to do a different authentication system for API routes.
	 * For example, you may want to check for an auth token or similar, that case,
	 * you will need to update the `src/hooks.server.ts` to add that authentication logic.
	 *
	 * This is just checking to see if they have a cookie set with their session token and
	 * then authenticates them that way, the same as the client.
	 */
	const user = event.locals?.user;

	if (!user) return json({ error: "not authorized" }, { status: 401 });

	return json({ id: user.id, email: user.email });
};
