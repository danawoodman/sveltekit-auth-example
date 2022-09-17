import { auth } from "$lib/auth";
import { AUTH_TOKEN_EXPIRY_SECONDS } from "$lib/constants.server";
import { invalid, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	async default(event) {
		const data = await event.request.formData();
		const email = data.get("email") as string;
		const password = data.get("password") as string;
		const password_confirm = data.get("password-confirm") as string;

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
		if (password !== password_confirm)
			return invalid(422, {
				email,
				error: "Your passwords must match.",
			});

		const signup_resp = await auth.signup({
			email,
			password,
			password_confirm,
			opts: { cookies: event.cookies },
		});

		if (signup_resp.isErr()) {
			const error = (
				String(signup_resp.error) ??
				"There was an issue creating your account. Please try again."
			).trim();
			return invalid(500, { email, error });
		}

		// Sign the user in immediately
		const login_resp = await auth.login({
			email,
			password,
			opts: { cookies: event.cookies },
		});

		if (login_resp.isErr()) {
			const error = (
				String(login_resp.error) ?? "Could not sign you in. Please try again."
			).trim();
			return invalid(500, { email, error });
		}

		const user = login_resp.value;
		if (user?.id && user?.token) {
			// TODO: duplicated in login page
			event.cookies.set("auth_token", `${user.id}:${user.token}`, {
				path: "/",
				maxAge: AUTH_TOKEN_EXPIRY_SECONDS,
			});
		}

		delete user.token;

		return { user };
	},
};
