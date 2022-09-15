import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = (event) => {
	const user = event.locals?.user;

	if (!user) return json({ error: "not authorized" }, { status: 401 });

	return json({ id: user.id, email: user.email });
};
