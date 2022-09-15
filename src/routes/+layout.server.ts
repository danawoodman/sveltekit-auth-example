import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	// Grab the current user and return it so all pages
	// have access to `$page.data.user`.
	const user = event.locals?.user;

	if (!user) return { user: null };

	const { id, email } = user;
	return { user: { email, id } };
};
