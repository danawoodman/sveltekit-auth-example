import type { LayoutServerLoadEvent } from "./$types";

export async function load(event: LayoutServerLoadEvent) {
	const user = event.locals?.user;
	if (!user) return { user: null };
	delete user.token;
	return { user };
}
