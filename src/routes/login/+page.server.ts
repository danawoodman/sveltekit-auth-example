import { invalid, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import debug from "debug";
import { login } from "$lib/auth";

const log = debug("app:routes/+page.server");

export const actions: Actions = {
	async default(event) {
		log("login");

		const data = await event.request.formData();
		const email = data.get("email") as string;
		const password = data.get("password") as string;

		log("logging in user:", email);

		const user = await login(event.cookies, email, password);
		if (!user)
			return invalid(401, {
				email,
				error: "No account with that email or username could be found.",
			});

		throw redirect(302, "/dashboard");
	},
};
