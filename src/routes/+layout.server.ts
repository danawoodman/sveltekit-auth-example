import type { LayoutServerLoadEvent } from "./$types";

export async function load(event: LayoutServerLoadEvent) {
	const user = event.locals?.user;
	if (!user) return { user: null };
	return { user: { id: user.id, email: user.email } };
}
