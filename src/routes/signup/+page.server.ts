import { signup } from "$lib/auth";
import { invalid, redirect } from "@sveltejs/kit";
import debug from "debug";
import type { Actions } from "./$types";

const log = debug("app:routes/signup/+page.server");

export const actions: Actions = {
	async default(event) {
		log("signup");
		const data = await event.request.formData();
		const email = data.get("email") as string;
		const password = data.get("password") as string;

		log("signing up user:", email);

		if (!email)
			return invalid(422, { email, error: "An email address is required." });
		if (!password)
			return invalid(422, { email, error: "A password is required." });
		if (password.length < 8)
			return invalid(422, {
				email,
				error: "Password must be at least 8 characters long.",
			});
		if (password.length > 32)
			return invalid(422, {
				email,
				error: "Password cannot be more than 32 characters long.",
			});

		await signup(event.cookies, email, password);

		throw redirect(302, "/dashboard");
	},
};