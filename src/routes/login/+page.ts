import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	const { user } = await event.parent();
	if (user) throw redirect(303, "/");
};
