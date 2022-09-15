import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals?.user;
	if (!user) throw redirect(301, "/login");
	return { user };
};
